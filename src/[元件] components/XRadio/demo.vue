<template>
  <div>
    <p>Use for single selection radio button input</p>
    <p>Need to combine both components to make input properly work</p>

    <div class="xd-block">
      <div class="options" style="margin-bottom: 1rem">
        <div class="xd-column">
          <XCheckbox v-model="error" size="sm">Error</XCheckbox>
        </div>
      </div>
      <strong>Normal</strong> (select: {{ selected }})
      <div class="xd-row">
        <XRadioButtonGroup v-model="selected" name="demo" :error="error">
          <XRadioButton :value="true" label="是" />
          <XRadioButton :value="false" label="否" />
        </XRadioButtonGroup>
      </div>

      <hr />

      <strong>Size: sm</strong> (select: {{ selectedSm }})
      <div class="xd-row">
        <XRadioButtonGroup
          v-model="selectedSm"
          name="demo-sm"
          size="sm"
          :error="error"
        >
          <XRadioButton :value="true" label="是" size="sm" />
          <XRadioButton :value="false" label="否" size="sm" />
        </XRadioButtonGroup>
      </div>

      <hr />

      <strong>Readonly</strong> (select: {{ selectedReadonly }})
      <div class="xd-row">
        <XRadioButtonGroup
          v-model="selectedReadonly"
          name="demo-readonly"
          :error="error"
        >
          <XRadioButton :value="true" label="是" readonly />
          <XRadioButton :value="false" label="否" readonly />
        </XRadioButtonGroup>
      </div>

      <hr />

      <strong>Disabled</strong> (select: {{ selectedDisabled }})
      <div class="xd-row">
        <XRadioButtonGroup
          v-model="selectedDisabled"
          name="demo-disabled"
          :error="error"
        >
          <XRadioButton :value="true" label="是" disabled />
          <XRadioButton :value="false" label="否" disabled />
        </XRadioButtonGroup>
      </div>

      <hr />

      <strong>Stacked</strong> (select: {{ selectedStacked }})
      <div class="xd-row">
        <XRadioButtonGroup
          v-model="selectedStacked"
          name="demo-stacked"
          stacked
          :error="error"
        >
          <XRadioButton value="yes" label="是" />
          <XRadioButton value="no" label="否" />
          <XRadioButton value="other" label="其他" />
        </XRadioButtonGroup>
      </div>

      <hr />

      <strong>Cancelable</strong> (select: {{ selectedCancelable }})
      <div class="xd-row">
        <XRadioButtonGroup
          v-model="selectedCancelable"
          name="demo"
          cancelable
          :error="error"
        >
          <XRadioButton :value="true" label="是" />
          <XRadioButton :value="false" label="否" />
        </XRadioButtonGroup>
      </div>
    </div>

    <dl class="xd-desc">
      <h3>XRadioButtonGroup</h3>

      <h4>Props</h4>
      <dt>modelValue: string | boolean</dt>
      <dd>v-model bind point</dd>
      <dt>name: string</dt>
      <dd>
        <strong>(Important)</strong>
        For radio input usage, auto provided to sub radio button
      </dd>
      <dt>size: 'sm' | 'md' (default: 'md')</dt>
      <dd>size of radio button group</dd>
      <dt>stacked: boolean = false</dt>
      <dd>stacked mode, show radio buttons in vertical orientation</dd>
      <dt>cancelable: boolean = false</dt>
      <dd>
        if set cancelable, reset value to undefined if click on current selected
        item
      </dd>
      <dt>error: boolean</dt>
      <dd>Indicate whether any error</dd>

      <h4>Emit</h4>
      <dt>update:modelValue: string | boolean</dt>
      <dd>input update upstream event</dd>

      <h4>Slots</h4>
      <dt>*default</dt>
      <dd>Container of the radio button</dd>
    </dl>

    <dl class="xd-desc">
      <h3>XRadioButton</h3>

      <h4>Props</h4>
      <dt>value: string</dt>
      <dd>value used for v-model</dd>
      <dt>label: string</dt>
      <dd>label show</dd>
      <dt>size: 'sm' | 'md' (default: 'md')</dt>
      <dd>size of radio button</dd>
      <dt>readonly: boolean = false</dt>
      <dd>readonly mode</dd>
      <dt>(not available) check: boolean</dt>
      <dd>
        <p>
          From standard, radio input is allow to have `checked` boolean to
          indicate if this element is checked by default.
        </p>
        <p>But in Vue, the default value is given by parent's model value.</p>
        <p>
          This checked value is computed by xui, you don't/can't pass checked
          attribute on it.
        </p>
      </dd>

      <h4>Slots</h4>
      <dt>*default</dt>
      <dd>Label part of the radio button</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XRadioButton from './XRadioButton.vue';
import XRadioButtonGroup from './XRadioButtonGroup.vue';

export default defineComponent({
  name: 'XRadioDemo',
  tabName: 'XRadio',
  components: { XCheckbox, XRadioButton, XRadioButtonGroup },
  setup() {
    return {
      error: ref(false),
      selected: ref(true),
      selectedSm: ref(true),
      selectedReadonly: ref(true),
      selectedDisabled: ref(true),
      selectedStacked: ref('yes'),
      selectedCancelable: ref(),
    };
  },
});
</script>
