<template>
  <div>
    <h3>Input Type:</h3>
    <div class="options" style="margin-bottom: 1rem">
      <h4>Option</h4>
      <div class="xd-column">
        <XCheckbox v-model="inline" size="sm">Inline Form Input</XCheckbox>
        <XCheckbox v-model="error" size="sm">Error</XCheckbox>
        <XCheckbox v-model="disable" size="sm">Disabled</XCheckbox>
        <XCheckbox v-model="readonly" size="sm">Readonly</XCheckbox>
        <XCheckbox v-model="required" size="sm">Required</XCheckbox>
        <XCheckbox v-model="fill" size="sm">Fill</XCheckbox>
        <XCheckbox v-model="borderless" size="sm">Borderless</XCheckbox>
        <XCheckbox v-model="circleError" size="sm">Circle Error Icon</XCheckbox>
        <XRadioButtonGroup
          v-model="size"
          class="xd-space"
          name="size"
          size="sm"
        >
          <label>Size:</label>
          <XRadioButton value="sm">sm</XRadioButton>
          <XRadioButton value="md">md</XRadioButton>
        </XRadioButtonGroup>
        <XInputText
          v-model="message"
          size="sm"
          label="Message:"
          inline
        ></XInputText>
      </div>
    </div>

    <div class="xd-column">
      <XInputText
        v-for="t in availableTypes"
        :key="t"
        v-model="value"
        :type="t"
        :label="t"
        :inline="inline"
        :error="error"
        :disabled="disable"
        :readonly="readonly"
        :required="required"
        :fill="fill"
        :size="size"
        :borderless="borderless"
        :message="message"
        :placeholder="`Type: ${t}`"
        :inputAttrs="{
          size: 1,
        }"
        :errorIcon="circleError ? 'alert-filled' : 'warning-filled'"
      />
    </div>

    <div class="xd-block">
      <h4>Required input</h4>
      <form class="xfe-login" @submit.prevent="showAlert(value)">
        <XInputText v-model="value" label="text" :required="true" />
        <XButton style="margin-top: 8px" type="submit">
          Show alert message
        </XButton>
      </form>
    </div>

    <div class="xd-block">
      <h4>Customize prefix, postfix</h4>
      <XInputText v-model="value">
        <template #prefix>
          <img src="@xui-assets/favicon.ico" alt="ico" width="24" />
        </template>
        <template #postfix>
          <span>| world</span>
        </template>
      </XInputText>

      <h4>Customize input style</h4>
      <XInputText
        v-model="value"
        inputStyle="background-color: #418fde; height: 30px;"
      >
      </XInputText>
      <br />
      <XInputText
        v-model="value"
        :inputAttrs="{ style: { width: '600px', color: 'red' } }"
      />
    </div>

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>modelValue: string</dt>
      <dd>modifier is not available at this point</dd>
      <dt>type: string</dt>
      <dd>Text input type</dd>
      <dt>size: &apos;md&apos; | &apos;sm&apos;</dt>
      <dd>size of input, default to <code class="xd-code">md</code></dd>
      <dt>inline: boolean</dt>
      <dd>if the display is set to inline</dd>
      <dt>borderless: boolean</dt>
      <dd>if no border in normal state</dd>
      <dt>inputAttrs: Object</dt>
      <dd>Extra attr to pass into input element</dd>
      <dt>label: string</dt>
      <dd>The label value, not very useful</dd>
      <dt>placeholder: string</dt>
      <dd>the placeholder to input element</dd>
      <dt>error: boolean</dt>
      <dd>Indicate whether any error</dd>
      <dt>errorIcon: string = 'alert-filled'</dt>
      <dd>error icon (circle: 'alert-filled')</dd>
      <dd>Indicate whether any error</dd>
      <dt>disabled: boolean</dt>
      <dd>disabled state</dd>
      <dt>readonly: boolean = false</dt>
      <dd>readonly mode</dd>
      <dt>required: boolean = false</dt>
      <dd>required field, will show asterisk mark (*) to the right of label</dd>
      <dt>fill: boolean</dt>
      <dd>filled style</dd>
      <dt>message: string</dt>
      <dd>the message below input element</dd>

      <h4>Slots</h4>
      <dt>prefix</dt>
      <dd>
        for prefix icon, if type is search, will show a magnify by default.
      </dd>
      <dt>postfix</dt>
      <dd>suffix for the the input element</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import XInputText, { availableTypes } from './XInputText.vue';
import XButton from '../XButton/XButton.vue';
import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XRadioButtonGroup from '../XRadio/XRadioButtonGroup.vue';
import XRadioButton from '../XRadio/XRadioButton.vue';

export default defineComponent({
  name: 'InputTextDemo',
  tabName: 'XInputText',
  components: {
    XInputText,
    XButton,
    XCheckbox,
    XRadioButtonGroup,
    XRadioButton,
  },
  setup() {
    return {
      availableTypes,
      inline: ref(false),
      value: ref('hello'),
      error: ref(false),
      disable: ref(false),
      readonly: ref(false),
      required: ref(false),
      borderless: ref(false),
      fill: ref(false),
      size: ref<'sm' | 'md'>('md'),
      message: ref(''),
      showAlert: (message: string) => alert(message),
      circleError: ref(true),
    };
  },
});
</script>
