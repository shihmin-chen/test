<template>
  <div class="x-multi-level-dropdown">
    <div
      ref="dropdownTarget"
      class="x-multi-level-dropdown-target"
      data-testid="x-multi-level-dropdown-target"
      :aria-disabled="disabled"
      @mouseenter="$emit('show', tippyInstance)"
    >
      <slot name="dropdown-button" :isMenuOpened="isExpand"></slot>
    </div>
    <div
      v-if="childrenRendered"
      ref="dropdownContent"
      class="x-multi-level-dropdown-content x-scroll-bar x-scroll-bar-lg"
      :style="{
        maxHeight: menuMaxHeight,
        maxWidth: menuMaxWidth,
        minWidth: menuMinWidth,
        ...tippyBoundingStyle,
      }"
    >
      <slot name="dropdown-menu">
        <div v-for="(itemGroup, groupIndex) in itemGroups" :key="groupIndex">
          <XDivider v-if="groupIndex > 0" />
          <XList :size="size" :subheader="itemGroup.name">
            <XMultiLevelDropdownMenu
              v-for="(item, itemIndex) in itemGroup.items"
              :key="itemIndex"
              :itemGroups="item.children"
              :size="size"
              :disabled="item.disabled"
              :menuOptions="menuOptions"
              :tippyBoundingOptions="tippyBoundingOptions"
              :menuMaxHeight="menuMaxHeight"
              :menuMaxWidth="menuMaxWidth"
              :menuMinWidth="menuMinWidth"
              :menuDebounceWait="menuDebounceWait"
              :lazyLoading="lazyLoading"
              @show="debounceSwitchMenu"
              @mouseleave="debounceSwitchMenu.cancel"
            >
              <template
                #dropdown-button="{ isMenuOpened }"
              >
                <XListItem
                  :selected="isMenuOpened"
                  :disabled="item.disabled"
                  :data-qa-key="item.name"
                  @click="onItemClick(item)"
                >
                  {{ item.name }}
                  <XListItemIcon
                    v-if="item?.children?.length && item?.children?.length > 0"
                    icon="caret-right"
                    position="back"
                  />
                </XListItem>
              </template>
            </XMultiLevelDropdownMenu>
          </XList>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash';
import { Instance as TippyInstance } from 'tippy.js';
import {
  inject,
  provide,
  ref,
  toRefs,
  unref,
} from 'vue';

import {
  disableTippyIfNeeded,
  useTippy,
  watchDisabledForTippy,
} from '../../composable';
import XDivider from '../XDivider/XDivider.vue';
import XList from '../XList/XList.vue';
import XListItem from '../XList/XListItem.vue';
import XListItemIcon from '../XList/XListItemIcon.vue';
import {
  useTippyBounding,
} from './composables/useTippyBounding';
import {
  XMultiLevelDropdownInjectKey,
  XMultiLevelDropdownItem,
} from './dropdown';
import type { DropdownProps } from './dropdownProps';

const props = withDefaults(defineProps<DropdownProps>(), {
  size: 'md',
  disabled: false,
  menuMaxHeight: '80vh',
  menuMaxWidth: '20.5rem',
  menuMinWidth: '9rem',
  itemGroups: () => [],
  options: () => ({}),
  menuOptions: () => ({}),
  menuDebounceWait: 0,
  lazyLoading: false,
  teleport: false,
  hideOnClick: true,
});

defineEmits(['show']);

const shownTippyInstance = ref();

// tippy config
const childrenRendered = ref(!props.lazyLoading);
const {
  target: dropdownTarget,
  content: dropdownContent,
  tippyInstance,
  isTippyShown: isExpand,
  hideTippy: hideMenu,
} = useTippy(undefined, undefined, {
  placement: 'right-start',
  interactive: true,
  arrow: false,
  trigger: 'manual',
  theme: 'x-multi-level-dropdown',
  offset: [-8, 0],
  hideOnClick: false,
  maxWidth: 'none',
  popperOptions: {
    modifiers: [
      {
        name: 'flip',
        options: {
          boundary: document.querySelector(':root'),
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: document.querySelector(':root'),
        },
      },
    ],
  },
  onCreate: (instance) => {
    disableTippyIfNeeded(props.disabled, instance);
  },
  ...props.menuOptions,
  ...props.options, // options only effect the first layer, and they should override menu-options
  onShow: (...args) => {
    childrenRendered.value = true;
    updateTippyBounding();
    props.options.onShow?.(...args);
  },
  onClickOutside: (...args) => {
    hideMenu();
    props.options.onClickOutside?.(...args);
  },
});

// tippy bounding
const isEnableTippyBounding = props.tippyBoundingOptions !== undefined;
const { tippyStyle: tippyBoundingStyle, updateTippyBounding } =
  isEnableTippyBounding
    ? useTippyBounding(
      tippyInstance,
      dropdownContent,
      props.tippyBoundingOptions,
    )
    : {
      tippyStyle: {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      updateTippyBounding: () => { },
    };

const switchMenu = (targetTippyInstance: TippyInstance) => {
  unref(shownTippyInstance.value)?.hide();
  shownTippyInstance.value = targetTippyInstance;
  unref(shownTippyInstance.value)?.show();
};

const debounceSwitchMenu = debounce(switchMenu, props.menuDebounceWait);

const { disabled } = toRefs(props);
watchDisabledForTippy(disabled, tippyInstance);

// get root instance for close whole menu tree
const rootTippyInstance = inject(
  XMultiLevelDropdownInjectKey,
  () => {
    provide(XMultiLevelDropdownInjectKey, tippyInstance);
    return tippyInstance;
  },
  true,
);

// handle click event
const onItemClick = (item: XMultiLevelDropdownItem) => {
  // skip disabled or non-leaf item
  if (!item || item.disabled || (item.children && item.children.length > 0)) {
    return;
  }
  item.callback?.();
  if (props.hideOnClick) {
    unref(rootTippyInstance)?.hide();
  }
};
</script>

<style lang="scss">
.tippy-box[data-theme~='x-multi-level-dropdown'] {
  white-space: nowrap;
  padding: 0;
  background: var(--xv-container--surface);
  box-shadow: var(--xv-shadow-m);
  border-radius: 8px;

  .tippy-content {
    padding: 0;
    min-width: max-content;
  }
}

.x-multi-level-dropdown-content {
  overflow: auto;
  z-index: var(--x-dropdown-menu-z-index);
}
</style>
