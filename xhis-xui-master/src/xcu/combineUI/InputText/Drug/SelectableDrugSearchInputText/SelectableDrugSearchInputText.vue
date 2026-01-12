<template>
  <!-- You could add the classes in parent component -->
  <div>
    <TitleWithRequiredStar :title="title" :is-required="isRequired" />

    <XInputText
      ref="substanceInputRef"
      v-model="searchText"
      :selected-results="substanceList.map((item) => getDrugDisplay(item))"
      show-selected-results
      :placeholder="
        substanceList.length === 1 ? '' : '搜尋藥物，請輸入學名、商品名'
      "
      :error="substanceError"
      :message="substanceErrorMessage"
      type="search"
      v-bind="substanceKeyListeners"
      @delete-selected-index="deleteSubstanceList"
      @focusin="
        setCurrentSubstanceIdx();
        setSubstanceFocus(true);
      "
      @focusout="setSubstanceFocus(false)"
      @keydown.enter="wrapHandleSubstanceTextEnter"
    />
    <div
      v-show="substanceList.length == 0 && !isSearchLoading"
      ref="substanceScrollListRef"
      class="x-scroll-bar x-fe-allergy-item-ul"
      :class="{
        'x-fe-allergy-item-ul--hide': !searchText,
      }"
      :style="{ 'max-height': `${substanceSearchHeight}px` }"
      @mousedown="mouseDownSubstanceSearchResult"
    >
      <div
        v-if="searchText && !substanceSearchStarted"
        class="xv-body--body-md x-fe-allergy-item-ul--idle"
      >
        點擊 Enter 後查看結果
      </div>
      <div
        v-else-if="searchText && !substanceSearchList?.length"
        class="xv-body--body-md x-fe-allergy-item-ul--idle"
      >
        查無相關結果
      </div>
      <div v-else class="selectable-allergy-chunk">
        <XList>
          <template
            v-for="(substance, index) in substanceSearchList"
            :key="index"
          >
            <XListItem
              interactive
              :disabled="checkSubstance(substance)"
              :class="{
                'x-fe-allergy-search-item': index !== currentSubstanceIdx,
                'x-fe-allergy-search-item-active':
                  index === currentSubstanceIdx,
              }"
              data-qa-widget="patientInfo"
              :data-qa-key="getDrugDisplay(substance)"
              :data-qa-order="index"
              v-bind="getSubstanceOptionAttrs(index)"
              @click="clickSubstanceItem(substance)"
            >
              <XListItemText
                :primary="getDrugDisplay(substance) ?? ''"
                :secondary="getDrugGenericDisplay(substance) ?? ''"
              />
              <div style="display: flex; margin-left: auto; gap: 4px">
                <XTag v-if="checkSubstance(substance)" outline>已有記錄</XTag>
              </div>
            </XListItem>
            <XDivider v-if="substanceSearchList.length - 1 !== index" />
          </template>
        </XList>
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
  generic="OnPremAllergySchema, SearchResultType, SearchResultContentType"
>
import { debounce, isEmpty } from 'lodash';
import {
  computed,
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
} from 'vue';

import {
  unrefElement,
  useKeyOperations,
  useTippy,
  XDivider,
  XInputText,
  XList,
  XListItem,
  XListItemText,
  XTag,
} from '../../../../../../index';

import { useSearchOnEnter } from '../../../../atomComposables/private/useSearchOnEnter';
import { useModelValue } from '../../../../atomComposables/useModelValue';
import TitleWithRequiredStar from '../../../../atomUI/TitleWithRequiredStar.vue';
import { MaybeRefOrComputed } from '../../../../type/interface';
import { sleep } from '../../../../utils';
import { useDrugSearch } from './composables/useDrugSearch';

const searchBottomPadding = 68;

const props = defineProps<{
  title?: MaybeRefOrComputed<string>;
  defaultResult?: MaybeRefOrComputed<SearchResultContentType[]>;
  isRequired?: MaybeRefOrComputed<boolean>;
  patientAllergyIntoleranceOnPremAllergyData: MaybeRefOrComputed<
    OnPremAllergySchema[]
  >;
  getDrugSearchResult: (searchText: string) => Promise<SearchResultType[]>;
  getDrugSearchResultContent: (
    data: SearchResultType,
  ) => SearchResultContentType;
  getDrugDisplay: (data: SearchResultContentType) => string;
  getDrugGenericDisplay: (data: SearchResultContentType) => string;
  getAllergySubstance: (item: OnPremAllergySchema) => string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: SearchResultContentType[]];
}>();

const { resultValue } = useModelValue<SearchResultContentType[]>({
  modelValue: props.defaultResult ?? [],
  // @ts-expect-error update:modelValue is a valid event
  emit,
  destroyedResultValue: [],
});

const substanceList = computed(() => unref(resultValue) ?? []);

const substanceFocus = ref(false);
const substanceSearchHeight = ref<number>(0);
const currentSubstanceIdx = ref(-1);

watch(
  () => substanceList.value,
  () => {
    console.log('substanceList.value:', substanceList.value);
    emit('update:modelValue', substanceList.value);
  },
  { deep: true },
);

const allergyIntolerance = computed(() =>
  unref(props.patientAllergyIntoleranceOnPremAllergyData),
);

const deleteSubstanceList = (index: number) => {
  substanceList.value.splice(index, 1);
};

const setCurrentSubstanceIdx = () => {
  currentSubstanceIdx.value = -1;
  for (let index = 0; index < substanceSearchList.value.length; index++) {
    const item = substanceSearchList.value[index];
    if (!checkSubstance(item)) {
      currentSubstanceIdx.value = index;
      return;
    }
  }
};

const searchText = ref('');
const {
  isSearchLoading,
  searchResults: substanceSearchList,
  search: performSearch,
  clearSearchResults,
} = useDrugSearch<SearchResultType, SearchResultContentType>(
  props.getDrugSearchResult,
  props.getDrugSearchResultContent,
);

const {
  handleKeyEnter: handleSubstanceTextEnter,
  searchStarted: substanceSearchStarted,
} = useSearchOnEnter({
  hasPredict: false,
  searchText,
  search: () => performSearch(searchText.value),
  showSearchArea: () => {
    if (substanceTippyInstance.value) {
      substanceTippyInstance.value?.show?.();
    }
  },
  hideSearchArea: () => {
    if (substanceTippyInstance.value) {
      substanceTippyInstance.value?.hide?.();
    }
  },
  clearSearchData: () => clearSearchResults(),
});

const wrapHandleSubstanceTextEnter = () => {
  if (substanceList.value.length === 0) {
    handleSubstanceTextEnter();
  }
};

const {
  content: substanceScrollListRef,
  target: substanceInputRef,
  tippyInstance: substanceTippyInstance,
} = useTippy(undefined, undefined, {
  theme: 'selected-drug-search-box',
  placement: 'bottom-start',
  interactive: true,
  // manually trigger
  trigger: '',
  hideOnClick: false,
  arrow: false,
  offset: [0, 2],
  appendTo: () => document.body,
});

const focusSubstanceSearchbar = () => {
  unrefElement(substanceInputRef)?.querySelector('input')?.focus?.();
};

const mouseDownSubstanceSearchResult = async () => {
  await new Promise((res) => setTimeout(res, 1));
  focusSubstanceSearchbar();
};

const clickSubstanceItem = (item: SearchResultContentType) => {
  if (!checkSubstance(item)) {
    substanceList.value.push(item);
    searchText.value = '';
    currentSubstanceIdx.value = -1;
  }
};

const {
  keyListeners: substanceKeyListeners,
  getOptionAttrs: getSubstanceOptionAttrs,
} = useKeyOperations<SearchResultContentType>(
  substanceSearchList,
  // @ts-expect-error ignore
  substanceScrollListRef,
  currentSubstanceIdx,
  clickSubstanceItem,
);

const checkSubstance = (data: SearchResultContentType) => {
  return (allergyIntolerance?.value ?? [])
    .map((item) => props.getAllergySubstance(item))
    .includes(props.getDrugDisplay(data) ?? '');
};

const onResize = async () => {
  await nextTick();

  substanceSearchHeight.value =
    window.innerHeight -
    (unrefElement(substanceInputRef)?.getBoundingClientRect().bottom ?? 0) -
    searchBottomPadding;
};

const handleMountedOrActivated = () => {
  addEventListener('resize', onResize);
  onResize();
};
onMounted(handleMountedOrActivated);
onActivated(handleMountedOrActivated);

const handleUnmountedOrDeactivated = () => {
  removeEventListener('resize', onResize);
};
onUnmounted(handleUnmountedOrDeactivated);
onDeactivated(handleUnmountedOrDeactivated);

const substanceError = computed(() => {
  return (
    (substanceList.value.length === 1 &&
      substanceFocus.value &&
      searchText.value.length > 0) ||
    (!isEmpty(substanceSearchList.value) &&
      substanceList.value.length === 0 &&
      !substanceFocus.value &&
      searchText.value.length > 0)
  );
});

const substanceErrorMessage = computed(() => {
  if (
    substanceList.value.length === 1 &&
    substanceFocus.value &&
    searchText.value.length > 0
  ) {
    return '每筆過敏僅可選擇一過敏項目';
  }
  if (
    !isEmpty(substanceSearchList.value) &&
    substanceList.value.length === 0 &&
    !substanceFocus.value &&
    searchText.value.length > 0
  ) {
    return '請從搜尋結果，選擇一藥物';
  }
  return '';
});

const setSubstanceFocus = debounce(async function (state: boolean) {
  substanceFocus.value = state;
  if (state && substanceList.value.length === 0) {
    await onResize();
    await nextTick();
    await sleep(200);
    substanceTippyInstance.value?.hide?.();
    substanceTippyInstance.value?.show?.();
  } else {
    substanceTippyInstance.value?.hide?.();
  }
}, 100);
</script>
<style lang="scss">
.tippy-box[data-theme='selected-drug-search-box'] {
  border-radius: 0;
  background-color: transparent;
  font-size: 16px;

  > .tippy-content {
    padding: 0;
  }

  .x-fe-allergy-item-ul {
    overflow: auto;
    width: 514px;
    min-height: 0;
    max-height: 460px;
    padding: 0;
    border-radius: 8px;
    background-color: var(--xv-container--surface);
    box-shadow: 0 0 8px 4px #2222;
    overflow-x: hidden;
    // transition: opacity 0.25s;

    &--hide {
      display: none;
    }

    &--idle {
      display: flex;
      width: 100%;
      height: 60px;
      align-items: center;
      padding: 0 32px;
      background-color: var(--xv-container--disabled-background);
      color: var(--xv-text--disabled-text);
    }
  }

  .selectable-allergy-chunk {
    .x-list {
      padding: 0;
    }

    display: inline-flex;
    width: 514px;
    flex-basis: 30%;
    flex-direction: column;
    padding: 0;
    gap: 0.5rem;
    background-color: var(--xv-container--surface);

    .x-list-item-text,
    .x-list-item-text-primary,
    .x-list-item-text-secondary {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-count-text {
      color: var(--xv-text--medium-emphasis-text);
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
    }
  }
}
</style>
