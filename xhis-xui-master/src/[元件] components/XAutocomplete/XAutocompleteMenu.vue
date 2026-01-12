<template>
  <XList v-bind="menuAttrs">
    <XListItem
      v-for="(option, index) in options"
      :key="getKeyIndex(keyIndex, option, 'value')"
      :size="size"
      v-bind="getOptionAttrs(option, index)"
      :disabled="!!option.disabled"
    >
      <span class="x-ellipsis--1">
        <slot name="option" v-bind="getOptionSlotParams(option, index)"></slot>
      </span>
    </XListItem>
  </XList>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XList from '../XList/XList.vue';
import XListItem from '../XList/XListItem.vue';
import { getKeyIndex } from '../../utils';
import {
  autocompleteMenuProps,
  getOptionSlotParams,
} from './autocompleteContext';

export default defineComponent({
  name: 'XAutocompleteMenu',
  components: { XList, XListItem },
  props: {
    ...autocompleteMenuProps,
  },
  setup() {
    return {
      getOptionSlotParams,
      getKeyIndex,
    };
  },
});
</script>
