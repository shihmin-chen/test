<template>
  <div>
    <div class="xd-block">
      <div class="xd-column">
        <div class="x-flex xd-space">
          <XCheckbox v-model="loading" size="sm">Loading</XCheckbox>
          <XCheckbox v-model="disabled" size="sm">Disabled</XCheckbox>
          <XCheckbox v-model="outline" size="sm">Outline</XCheckbox>
        </div>
        <XRadioButtonGroup
          v-model="size"
          class="xd-space"
          name="size"
          size="sm"
        >
          <label>Size:</label>
          <XRadioButton v-for="sz in sizes" :key="sz" :value="sz">
            {{ sz }}
          </XRadioButton>
        </XRadioButtonGroup>
      </div>

      <div>
        <div v-for="theme in themes" :key="theme" class="xd-row">
          <span class="theme-tag">{{ theme }}:</span>
          <template v-for="icon in ['', 'avatar']">
            <XButton
              v-for="display in displayTypes"
              :key="`${display}${icon}`"
              :display="display"
              :size="size"
              :outline="outline"
              :theme="theme"
              :icon="icon"
              v-bind="{ disabled, loading }"
            >
              {{ display }}
            </XButton>
          </template>
        </div>
      </div>
      <hr class="xd-hr" />
      <div class="xd-row">
        <span class="theme-tag">Link:</span>
        <template v-for="icon in ['', 'avatar']">
          <XButton
            v-for="visited in [true, false]"
            :key="`link${icon}${visited}`"
            display="link"
            :size="size"
            :outline="outline"
            :visited="visited"
            :icon="icon"
            url="https://www.google.com.tw/"
            v-bind="{ disabled, loading }"
          >
            link
          </XButton>
        </template>
      </div>
    </div>

    <LoadingStateGuard
      style="border: solid 1px #2222; padding: 1rem"
    ></LoadingStateGuard>

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>
        display: XButtonDisplayType = 'button' | 'text' | 'link' (default:
        'button')
      </dt>
      <dd>display type</dd>
      <dt>
        theme: XButtonTheme = 'primary' | 'tertiary' | 'danger' | 'warning'
        (default: 'primary')
      </dt>
      <dd>color theme to use</dd>
      <dt>size: XButtonSize = 'md' | 'sm' | 'lg' (default: 'md')</dt>
      <dd>control size of the button</dd>
      <dt>outline: boolean = false</dt>
      <dd>outline style</dd>
      <dt>loading: boolean = false</dt>
      <dd>
        whether this button is loading, will set disabled on button as well
      </dd>
      <dt>disabled: boolean = false</dt>
      <dd>
        button disabled state, DO NOT PROVIDE IT if only guarding loading state
      </dd>
      <dt>url: string | URL</dt>
      <dd>If provide, the element for XButton will be anchor link</dd>
      <dt>icon: string | Object</dt>
      <dd>
        If provide, icon will be render using <code class="xd-code">XIcon</code>
      </dd>

      <h4>Slots</h4>
      <dt>default</dt>
      <dd>The button container for text</dd>
      <dt>icon = { color: &apos;var(--x-btn-color)&apos; }</dt>
      <dd>The left icon container</dd>
      <dd>
        You can provide custom icon render logic for this slot, if not provided
        will use XIcon as default icon resolver.
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { XButtonDisplayType, XButtonSize, XButtonTheme } from '../../shared';
import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XRadioButton from '../XRadio/XRadioButton.vue';
import XRadioButtonGroup from '../XRadio/XRadioButtonGroup.vue';
import LoadingStateGuard from './demo/LoadingStateGuard.vue';
import XButton from './XButton.vue';

const displayTypes: XButtonDisplayType[] = ['button', 'text'];
const themes: XButtonTheme[] = ['primary', 'danger', 'warning', 'tertiary'];
const sizes: XButtonSize[] = ['sm', 'md', 'lg'];

export default defineComponent({
  name: 'XButtonDemo',
  tabName: 'XButton',
  components: {
    XButton,
    XCheckbox,
    XRadioButtonGroup,
    XRadioButton,
    LoadingStateGuard,
  },
  setup() {
    return {
      displayTypes,
      loading: ref(false),
      disabled: ref(false),
      outline: ref(false),
      sizes,
      size: ref<XButtonSize>('md'),
      themes,
      rounded: ref(true),
    };
  },
});
</script>

<style lang="scss" scoped>
.theme-tag {
  min-width: 8ch;
  text-align: right;
  text-transform: capitalize;
}
</style>
