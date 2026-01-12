<template>
  <div>
    <div style="margin-bottom: 8px">
      <XButton @click="resetIndeterminate">Reset Indeterminate</XButton>
    </div>
    <div>
      <label>checked:</label>
      {{ checked }}
      <br />
      <label>indeterminate:</label>
      {{ indeterminate }}
    </div>
    <div class="xd-block">
      <div class="x-flex xd-space">
        <label>default:</label>
        <XCheckbox v-model="checked">Normal</XCheckbox>
        <XCheckbox v-model="checked" disabled>Disabled</XCheckbox>
        <XCheckbox v-model="checked" readonly>Readonly</XCheckbox>
        <XCheckbox v-model:error="error">Error</XCheckbox>
      </div>
      <div class="xd-row xd-space">
        <label>sm:</label>
        <XCheckbox v-model="checked" size="sm">Normal (sm)</XCheckbox>
        <XCheckbox v-model="checked" size="sm" disabled>Disabled</XCheckbox>
        <XCheckbox v-model="checked" size="sm" readonly>Readonly</XCheckbox>
        <XCheckbox v-model:error="error" size="sm">Error</XCheckbox>
      </div>
      <div class="xd-row xd-space">
        <label>indeterminate:</label>
        <XCheckbox v-model="checked" v-model:indeterminate="indeterminate">
          Normal
        </XCheckbox>
        <XCheckbox
          v-model="checked"
          v-model:indeterminate="indeterminate"
          disabled
        >
          Disabled
        </XCheckbox>
        <XCheckbox
          v-model="checked"
          v-model:indeterminate="indeterminate"
          readonly
        >
          Readonly
        </XCheckbox>
      </div>
    </div>

    <div class="xd-block">
      <CheckboxLinkage />
    </div>

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>modelValue: boolean</dt>
      <dd>model value for checked value</dd>
      <dt>indeterminate: boolean</dt>
      <dd>indeterminate state</dd>
      <dt>size: 'sm' | 'md' (default: 'md')</dt>
      <dd>size of checkbox</dd>
      <dt>readonly: boolean = false</dt>
      <dd>readonly mode</dd>
      <dt>hideCheckBox: boolean = false</dt>
      <dd>hide checkbox, legacy code from patient record</dd>
      <dt>error: boolean</dt>
      <dd>Indicate whether any error</dd>

      <h4>Emits</h4>
      <dt>update:modelValue: boolean</dt>
      <dd>v-model updater</dd>
      <dt>update:indeterminate: boolean</dt>
      <dd>v-model indeterminate updater</dd>

      <h4>Notice</h4>
      <dd>please use v-model for indeterminate, or the prop will not sync.</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import XButton from '../XButton/XButton.vue';
import XCheckbox from './XCheckbox.vue';
import CheckboxLinkage from './demo/CheckboxLinkage.vue';

export default defineComponent({
  name: 'XCheckboxDemo',
  tabName: 'XCheckbox',
  components: { XCheckbox, XButton, CheckboxLinkage },
  setup() {
    const checked = ref(true);
    const indeterminate = ref(true);
    const error = ref(true);
    const resetIndeterminate = () => {
      indeterminate.value = true;
    };

    return {
      checked,
      indeterminate,
      error,
      resetIndeterminate,
    };
  },
});
</script>
