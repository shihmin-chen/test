<template>
  <template
    v-for="state in computedChildrenCheckboxState"
    :key="`${state.key}`"
  >
    <XCheckbox
      v-if="state.visible !== false"
      v-model="state.checked"
      v-model:indeterminate="state.indeterminate"
      :disabled="state.disabled"
      @update:model-value="(e: Event) => handleUpdateChildrenCheckbox(state, e)"
    >
      {{ state.display }}
    </XCheckbox>
  </template>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, unref } from 'vue';

import { CheckboxState, XCheckbox } from '../../../index';
import { MaybeRefOrComputed } from '../type';

export default defineComponent({
  name: 'CheckboxGroup',
  components: {
    XCheckbox,
  },
  props: {
    childrenCheckboxState: {
      type: Object as PropType<MaybeRefOrComputed<CheckboxState[]>>,
      required: true,
    },
    handleUpdateChildrenCheckbox: {
      type: Function as PropType<(item: CheckboxState, event: Event) => void>,
      required: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  setup(props) {
    const computedChildrenCheckboxState = computed(() =>
      unref(props.childrenCheckboxState),
    );

    return {
      computedChildrenCheckboxState,
    };
  },
});
</script>
