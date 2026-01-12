<template>
  <!--@vue-expect-error -->
  <XMultiLevelDropdownMenu :size="size" :disabled="disabled" :menuMaxHeight="menuMaxHeight" :menuMaxWidth="menuMaxWidth"
    :itemGroups="itemGroups" :options="tippyOptions" :menuOptions="menuOptions"
    :tippyBoundingOptions="tippyBoundingOptions" :menuDebounceWait="menuDebounceWait" :lazyLoading="lazyLoading"
    :hideOnClick="hideOnClick" @show="debounceSwitchMenu" @mouseleave="debounceSwitchMenu.cancel">
    <template #dropdown-button="{ isMenuOpened }">
      <slot name="dropdown-button" :isMenuOpened="isMenuOpened">
        <XMultiLevelDropdownButton :disabled="disabled" :on="isMenuOpened">
          <slot :isMenuOpened="isMenuOpened"></slot>
        </XMultiLevelDropdownButton>
      </slot>
    </template>
  </XMultiLevelDropdownMenu>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash';
import { Instance as TippyInstance } from 'tippy.js';
import { unref } from 'vue';

import type { DropdownProps } from './dropdownProps';
import XMultiLevelDropdownButton from './XMultiLevelDropdownButton.vue';
import XMultiLevelDropdownMenu from './XMultiLevelDropdownMenu.vue';

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

const emit = defineEmits(['show']);

const tippyOptions = {
  placement: 'bottom-start',
  offset: [0, 0],
  trigger: 'click',
  ...(props.teleport ? { appendTo: () => document.body } : {}), // should only apply teleport for root tippy instance. Otherwise, child tippy will not be hidden when hide parent.
  ...props.options,
};

const switchMenu = (targetTippyInstance: TippyInstance) => {
  if (targetTippyInstance?.props?.trigger === 'manual') {
    unref(targetTippyInstance)?.show();
  }
  emit('show', targetTippyInstance);
};

const debounceSwitchMenu = debounce(switchMenu, props.menuDebounceWait);
</script>
