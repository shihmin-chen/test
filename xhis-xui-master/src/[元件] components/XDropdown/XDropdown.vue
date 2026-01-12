<template>
  <div>
    <div
      ref="target"
      class="x-dropdown-target"
      :style="buttonWrapperStyle"
      data-testid="dropdown-target"
      data-qa-xui="XDropdownButton"
    >
      <slot :isMenuOpened="isExpand">
        <XIconButton
          icon="more-hori"
          :size="size"
          :disabled="disabled"
          :on="isExpand"
          class="x-flex-center"
        />
      </slot>
    </div>
    <div
      v-if="tippyRendered"
      ref="dropdownMenu"
      class="x-dropdown-menu x-scroll-bar x-scroll-bar-lg"
      data-qa-xui="XDropdownMenu"
    >
      <slot name="dropdownHeader"></slot>
      <slot name="dropdownList" :hideMenu="hideMenu">
        <XList :size="size" noPadding>
          <XListItem
            v-for="(item, index) in items"
            :key="index"
            :data-qa-key="item.name"
            :data-qa-order="index"
            :disabled="item.disabled"
            :itemStyle="itemStyle"
            class="x-dropdown-menu-item"
            @click="onItemClick(item)"
          >
            {{ item.name }}
          </XListItem>
        </XList>
      </slot>
      <slot name="dropdownFooter"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  CSSProperties,
  defineComponent,
  PropType,
  toRefs,
  watch,
  ref,
} from 'vue';
import { Props as TippyProps } from 'tippy.js';
import { XDropdownSize, XDropdownItem } from './dropdown';
import XIconButton from '../XIconButton/XIconButton.vue';
import XList from '../XList/XList.vue';
import XListItem from '../XList/XListItem.vue';
import {
  useTippy,
  disableTippyIfNeeded,
  watchDisabledForTippy,
} from '../../composable';

export default defineComponent({
  name: 'XDropdown',
  components: { XIconButton, XList, XListItem },
  props: {
    size: {
      type: String as PropType<XDropdownSize>,
      default: 'md',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array as PropType<XDropdownItem[]>,
      default: () => [],
    },
    options: {
      type: Object as PropType<Partial<TippyProps>>,
      default: () => ({}),
    },
    itemStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    buttonWrapperStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    lazyLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setExpand: (_value: boolean) => true,
  },
  setup(props, { emit }) {
    const tippyRendered = ref(!props.lazyLoading);
    const {
      target,
      content: dropdownMenu,
      tippyInstance,
      isTippyShown: isExpand,
      hideTippy: hideMenu,
    } = useTippy(undefined, undefined, {
      placement: 'bottom-end',
      interactive: true,
      arrow: false,
      trigger: 'click',
      theme: 'dropdown',
      offset: [0, 8],
      ...props.options,
      onCreate: (instance) => {
        disableTippyIfNeeded(props.disabled, instance);
      },
      onShow: (...args) => {
        tippyRendered.value = true;
        props.options.onShow?.(...args);
      },
    });

    const { disabled } = toRefs(props);
    watchDisabledForTippy(disabled, tippyInstance);

    const onItemClick = (item: XDropdownItem) => {
      item.callback?.();
      hideMenu();
    };

    watch(isExpand, (value) => emit('setExpand', value));

    return {
      target,
      dropdownMenu,
      isExpand,
      onItemClick,
      hideMenu,
      tippyRendered,
    };
  },
});
</script>

<style lang="scss">
.x-dropdown-target {
  width: fit-content;
}

.x-dropdown-menu {
  padding: 0.5rem 0;
  z-index: var(--x-dropdown-menu-z-index);
}

.x-dropdown-menu-item {
  min-width: 144px;
  max-width: 300px;
}
</style>
