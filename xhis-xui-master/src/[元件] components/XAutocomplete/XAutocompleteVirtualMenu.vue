<template>
  <!-- @vue-expect-error -->
  <div
    v-bind="{ ...containerProps, ...menuAttrs }"
    :ref="handleRef"
    class="x-scroll-bar x-scroll-bar-lg"
  >
    <XList v-bind="wrapperProps">
      <XListItem
        v-for="{ data: option, index } in list"
        :key="getKeyIndex(keyIndex, option, 'value')"
        :size="size"
        v-bind="getOptionAttrs(option, index)"
        :disabled="!!option.disabled"
      >
        <slot name="option" v-bind="getOptionSlotParams(option, index)"></slot>
      </XListItem>
    </XList>
  </div>
</template>

<script lang="ts">
import { useVirtualList, UseVirtualListOptions } from '@vueuse/core';
import { defineComponent, PropType, Ref, toRefs, unref } from 'vue';

import { getKeyIndex } from '../../utils';
import XList from '../XList/XList.vue';
import XListItem from '../XList/XListItem.vue';
import {
  autocompleteMenuProps,
  getOptionSlotParams,
} from './autocompleteContext';

export default defineComponent({
  name: 'XAutocompleteVirtualMenu',
  components: { XList, XListItem },
  props: {
    ...autocompleteMenuProps,
    virtualOptions: {
      type: Object as PropType<UseVirtualListOptions>,
      default: () => ({}),
    },
    minWidth: {
      type: String,
      default: '15rem',
    },
  },
  setup(props) {
    const { virtualOptions, options, menuAttrs, minWidth } = toRefs(props);
    const { list, containerProps, wrapperProps } = useVirtualList(options, {
      // @ts-expect-error virtualOptions is not defined in useVirtualList
      itemHeight: unref(virtualOptions).itemHeight,
      overscan: unref(virtualOptions).overscan,
    });
    const handleRef = (element: HTMLElement) => {
      if (unref(menuAttrs).ref) {
        (unref(menuAttrs).ref as Ref).value = element;
      }
      containerProps.ref.value = element;
      if (element) {
        element.style.minWidth = minWidth.value;
      }
    };

    return {
      list,
      containerProps,
      wrapperProps,
      getKeyIndex,
      getOptionSlotParams,
      handleRef,
    };
  },
});
</script>
