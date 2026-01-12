<template>
  <div>
    <h4>Tippy Composition API</h4>
    <p>
      Tooltip utils is provide by
      <a
        ref="urlTarget"
        class="xd-a"
        href="https://atomiks.github.io/tippyjs/"
        rel="noopener"
      >
        Tippy.js
      </a>
      <img
        ref="urlElement"
        src="https://atomiks.github.io/tippyjs/static/logo-ebc385458e03fdb24af078536af88065.svg"
        width="128"
        height="128"
        referrerpolicy="no-referrer"
      />

      , powered by popper.js.
    </p>
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
      Due to implementation detail, <code class="xd-code">options</code> is not
      reactive.
    </p>
    <hr class="xd-hr" />
    <span>String Tooltip</span>
    <div class="xd-block x-flex-center">
      <span>hover on the image:</span>
      <img ref="target" src="@xui-assets/favicon.ico" alt="favicon" />
    </div>

    <span>Vue Element Tooltip</span>
    <div class="xd-block x-flex-center">
      <span style="margin-right: 0.5rem">focus the button</span>
      <div>
        <XButton ref="target2">focus me</XButton>
        <div ref="element" style="padding: 1rem">
          <label>
            Type something?
            <XInputText type="text" placeholder="a form!" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTippy } from './useTippy';
import XInputText from '../../components/XInput/XInputText.vue';
import XButton from '../../components/XButton/XButton.vue';

export default defineComponent({
  name: 'UseTippyDemo',
  tabName: 'UseTippy',
  components: { XInputText, XButton },
  setup() {
    const { target } = useTippy(undefined, 'hello world');
    const { target: target2, content: element } = useTippy(
      undefined,
      undefined,
      {
        interactive: true,
      }
    );

    const { target: urlTarget, content: urlElement } = useTippy();

    return {
      target,
      target2,
      element,
      urlTarget,
      urlElement,
    };
  },
});
</script>
