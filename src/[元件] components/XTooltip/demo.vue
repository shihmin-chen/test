<template>
  <div>
    <h4>Simple Tooltip Component</h4>
    <div class="xd-block x-flex-center xd-space wrap">
      <XTooltip content="basic text tooltip" class="element">hover me</XTooltip>

      <XTooltip
        :rootComponent="XButtonVue"
        content="custom component"
        :options="{
          trigger: 'click',
          hideOnClick: 'toggle',
        }"
      >
        cool button
      </XTooltip>

      <XTooltip
        :content="`👀 ${value || 'nothing'}`"
        :options="{
          trigger: 'focusin',
        }"
      >
        <XInputText v-model="value" type="password" inline />
      </XTooltip>

      <XTooltip
        :options="{
          theme: 'blue-card',
          arrow: false,
        }"
        content='the theme name is "blue-card"'
        class="element"
      >
        Blue Card
      </XTooltip>

      <XTooltip
        content="only show tooltip when ellipsis"
        ellipsis
        class="element"
        style="display: block"
      >
        hover me when ellipsis (Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, 
        <span>
          sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.)
        </span>
      </XTooltip>
    </div>

    <h4>Custom Theme Tooltip Component</h4>
    <XInputText
      v-model="tooltipContent"
      label="content"
      :inline="true"
    ></XInputText>
    <div class="xd-block x-flex-center xd-space wrap">
      <h5>Width = 200px</h5>
      <XTooltip
        :content="tooltipContent"
        :options="{ theme: 'x-demo-custom-theme-width200' }"
        class="element"
      >
        <span>hover me</span>
      </XTooltip>
      <h5>Min-Width = 100px, Max-Width = 200px</h5>
      <XTooltip
        :content="tooltipContent"
        :options="{
          theme: 'x-demo-custom-theme-width100-200',
          maxWidth: '200px',
        }"
        class="element"
      >
        <span>hover me</span>
      </XTooltip>
    </div>

    <p>
      Options is a valid
      <a
        class="xd-a"
        href="https://atomiks.github.io/tippyjs/v6/all-props/"
        rel="noopener"
        title="tippy.js"
      >
        tippy.js options
      </a>
    </p>
    <p>
      Due to implementation detail,
      <code class="xd-code">options</code> is not reactive.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import XTooltip from './XTooltip.vue';
import XButtonVue from '../XButton/XButton.vue';
import XInputText from '../XInput/XInputText.vue';

export default defineComponent({
  name: 'XTooltipTippyDemo',
  tabName: 'XTooltip',
  components: { XTooltip, XInputText },
  setup() {
    const tooltipContent = ref('content');
    return {
      XButtonVue: XButtonVue,
      value: ref(''),
      tooltipContent,
    };
  },
});
</script>

<style scoped>
.element {
  display: inline-flex;
  border: 2px solid #2222;
  border-radius: 4px;
  padding: 0.5rem 1rem;
}
.wrap {
  flex-wrap: wrap;
}
</style>
<style lang="scss">
.base-demo-tippy {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  overflow-wrap: anywhere;
}

.tippy-box[data-theme~='x-demo-custom-theme-width200'] {
  @extend .base-demo-tippy;
  width: 200px;
}
.tippy-box[data-theme~='x-demo-custom-theme-width100-200'] {
  @extend .base-demo-tippy;
  min-width: 100px;
  max-width: 200px;
}
</style>
