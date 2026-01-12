<template>
  <div class="x-demo-checkbox-linkage">
    <div
      v-for="(demoCase, index) in demoCaseList"
      :key="index"
      class="x-demo-checkbox-linkage"
    >
      <p>{{ demoCase.title }}:</p>
      <XCheckbox
        v-model="demoCase.parentCheckboxState.value.checked"
        v-model:indeterminate="demoCase.parentCheckboxState.value.indeterminate"
        :disabled="demoCase.parentCheckboxState.value.disabled"
        @update:modelValue="demoCase.handleUpdateParentCheckbox()"
      >
        all
        <label class="x-demo-checkbox-linkage-label">
          checked: {{ demoCase.parentCheckboxState.value.checked }},
          indeterminate:
          {{ demoCase.parentCheckboxState.value.indeterminate }}
        </label>
      </XCheckbox>
      <XCheckbox
        v-for="state in demoCase.childrenCheckboxState.value"
        :key="state.key"
        v-model="state.checked"
        v-model:indeterminate="state.indeterminate"
        :disabled="state.disabled"
        @update:modelValue="demoCase.handleUpdateChildrenCheckbox()"
      >
        {{ state.display }}
        <label class="x-demo-checkbox-linkage-label">
          checked: {{ state.checked }}, indeterminate: {{ state.indeterminate }}
        </label>
      </XCheckbox>

      <hr class="xd-hr" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { cloneDeep } from 'lodash';
import { useCheckboxLinkage } from '../../../composable/useCheckboxLinkage';
import XCheckbox from '../XCheckbox.vue';
import {
  parentState,
  childrenState,
  childrenStateWithIndeterminate,
  childrenStateWithDisabled,
  childrenStateWithAllDisabled,
  childrenStateWithEmpty,
} from './fakedata';

const demoCaseList = [
  {
    title: 'Normal case',
    parentCheckboxState: cloneDeep(parentState),
    childrenCheckboxState: cloneDeep(childrenState),
  },
  {
    title: 'Indeterminate case',
    parentCheckboxState: cloneDeep(parentState),
    childrenCheckboxState: cloneDeep(childrenStateWithIndeterminate),
  },
  {
    title: 'Disabled case',
    parentCheckboxState: cloneDeep(parentState),
    childrenCheckboxState: cloneDeep(childrenStateWithDisabled),
  },
  {
    title: 'All disabled case',
    parentCheckboxState: cloneDeep(parentState),
    childrenCheckboxState: cloneDeep(childrenStateWithAllDisabled),
  },
  {
    title: 'Empty case',
    parentCheckboxState: cloneDeep(parentState),
    childrenCheckboxState: cloneDeep(childrenStateWithEmpty),
  },
].map((demoCase) => {
  const parentCheckboxState = ref(demoCase.parentCheckboxState);
  const childrenCheckboxState = ref(demoCase.childrenCheckboxState);
  const { handleUpdateParentCheckbox, handleUpdateChildrenCheckbox } =
    useCheckboxLinkage(parentCheckboxState, childrenCheckboxState);
  return {
    title: demoCase.title,
    parentCheckboxState,
    childrenCheckboxState,
    handleUpdateParentCheckbox,
    handleUpdateChildrenCheckbox,
  };
});
</script>

<style lang="scss">
.x-demo-checkbox-linkage {
  display: inline-flex;
  flex-direction: column;
}

.x-demo-checkbox-linkage-label {
  color: var(--xv-text--low-emphasis-text);
}
</style>
