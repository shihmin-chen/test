<template>
  <XCheckbox
    v-model="computedParentCheckboxState.checked"
    v-model:indeterminate="computedParentCheckboxState.indeterminate"
    :disabled="computedParentCheckboxState.disabled"
    @update:model-value="handleUpdateParentCheckbox"
  >
    {{ computedParentCheckboxState.display }}
  </XCheckbox>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, unref } from 'vue';

import { CheckboxState, XCheckbox } from '../../../index';

import { MaybeRefOrComputed } from '../type';

export default defineComponent({
  name: 'CheckboxAll',
  components: {
    XCheckbox,
  },
  props: {
    parentCheckboxState: {
      type: Object as PropType<MaybeRefOrComputed<CheckboxState>>,
      required: true,
    },
    handleUpdateParentCheckbox: {
      type: Function as PropType<(event: Event) => void>,
      required: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  emits: ['update:modelValue', 'update:parentState'],

  setup(props) {
    const computedParentCheckboxState = computed(() =>
      unref(props.parentCheckboxState),
    );

    return {
      computedParentCheckboxState,
    };
  },
});
</script>

<style lang="scss">
.x-demo-checkbox-linkage {
  display: inline-flex;
  flex-direction: column;
}
</style>
