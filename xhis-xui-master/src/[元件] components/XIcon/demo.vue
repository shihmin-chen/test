<template>
  <div>
    <div class="notice x-shadow--dialog">
      <XIcon class="notice-icon" width="48" height="48" icon="alert-outline" />
      <h3 class="notice-header">Heads up</h3>
      <p>
        Ensure you use XUI svg loader and enable it in vite config with proper
        setting if you want to provide custom svg icon.
      </p>
    </div>
    <div class="xd-block svg-demo">
      <div class="input-form">
        <XInputText
          v-model="icon"
          label="Icon"
          placeholder="Insert any name that was defined in icon-component"
        />
        <XInputText v-model="color" label="Color" />
      </div>
      <div class="svg-render">
        Rendered:
        <div class="svg-container x-shadow">
          <XIcon width="60" height="60" :icon="icon" :color="color" />
        </div>
      </div>
      <PrismCode lang="html" :code="code" block />
    </div>

    <hr class="xd-hr" />

    <h3>Available Icons</h3>
    <div class="svg-block-container">
      <div
        v-for="name in names"
        :key="name"
        class="svg-block x-aria-tooltip"
        :aria-label="name"
      >
        <XIcon style="height: 32px; width: 32px" :icon="name" :color="color" />
        <span class="svg-block-name x-ellipsis--1"> {{ name }}</span>
      </div>
    </div>

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>icon: string | SVGComponent(render function)</dt>
      <dd>
        If provide string, search this icon in sources. Can also provide already
        resolved SVGComponent by loader or just an svg component.
      </dd>
      <dt>color?: string</dt>
      <dd>
        color variable used by this component, could be any valid css color or
        css variable (with var(...), see CSS Variable)
      </dd>

      <h4>CSS Variable</h4>
      <dt>--x-icon-color: color = currentColor</dt>
      <dd>
        Default to current color. Changeable color use this variable to retrieve
        color. So you can directly provide this variable without the need of
        props.
      </dd>
    </dl>

    <hr class="xd-hr" />

    <h3>Notes and Caveats</h3>
    <ul>
      <li>
        preserveAspectRatio is set in this component. You only need to provide
        style and width, height to component to change size.
      </li>
      <li>
        Only black color will be changeable in transform, if svg color is not
        changing, you might want to look at browser devTools to see what is the
        actually rendering color name. It should be var(--x-icon-color)
      </li>
    </ul>

    <h3 id="about-svg-icon">About SVG Icon</h3>
    <p>
      SVG is a special element in html, it is so special that React, Vue,
      Svelte, Angular has a special code render these naughty children. While in
      normal practice, html code is not directly render-able by framework as
      it's not secure.
    </p>
    <p>
      Hence, XUI provide a special <strong>vite plugin</strong> to compile svg
      file into Vue component in loading phase. There is two way to trigger the
      transformation.
    </p>
    <ul>
      <li>
        By vite query:<br />
        <PrismCode>
          import Icon from &apos;../foo/bar/avatar.svg?component&apos;
        </PrismCode>
      </li>
      <li>
        By RegExp folder &apos;icon-component&apos;:<br />
        <PrismCode>
          import Icon from &apos;./any/where/icon-component/avatar.svg&apos;
        </PrismCode>
      </li>
    </ul>
    <p>
      Under the hood XIcon use the second method to enable import.meta.glob
      feature to auto import all icon from icon-component folder. But in all
      other situation, using query loader will be better since we can easily
      detect whether that thing should be a component in testing environment.
    </p>
    <p>
      And the color, that color. It's also tricky since svg element can use
      various method to create a color. For simplicity, XUI loader directly
      replace #000, #000000, #00000000, black with
      <code class="xd-code">var(--x-icon-color)</code> and expose a props that
      will set style of this variable dynamically. So if you want, you can also
      directly provide the variable color for --x-icon-color. In that way,
      writing CSS for changing color should be a lot easier.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, computed } from 'vue';
import XIcon from './XIcon.vue';
import XInputText from '../XInput/XInputText.vue';

const names = __XUI_ICON_NAMES__;

export default defineComponent({
  name: 'XIconDemo',
  tabName: 'XIcon',
  components: { XIcon, XInputText },
  setup() {
    const icon = ref('avatar');
    const color = ref('var(--xv-status--primary)');
    const code = computed(
      () => `<XIcon icon="${unref(icon)}" color="${unref(color)}" />`
    );
    return {
      icon,
      color,
      code,
      names,
    };
  },
});
</script>

<style lang="scss" scoped>
.notice {
  display: grid;
  grid-template-areas: 'icon head' 'icon desc';
  grid-template-columns: 48px 1fr;
  background-color: var(--xv-neutral--800);
  border-radius: 16px;
  padding: 16px 24px;
  gap: 0 16px;
  color: var(--xv-neutral--100);

  &-header {
    color: var(--xv-yellow--300);
    margin: 0 0 8px 0;
  }

  &-icon {
    --x-icon-color: var(--xv-yellow--400);
    grid-area: icon;
    align-self: center;
    justify-self: center;
  }
  > p {
    margin: 0;
  }
}
.input-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.svg-render {
  margin: 1rem;
  min-height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.svg-container {
  margin-left: 16px;
  background-color: white;
  border: solid 1px #2222;
  border-radius: 4px;
  display: inline-flex;
}

.svg-block {
  $bd: solid 1px #ddd;
  &-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    border-top: $bd;
    border-left: $bd;
  }
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-right: $bd;
  border-bottom: $bd;
  color: var(--xv-text--medium-emphasis-text);
  gap: 4px;
  &-name {
    width: 100%;
    text-align: center;
  }

  &:hover {
    background-color: var(--xv-container--surface-hovered);
    color: var(--xv-text--high-emphasis-text);
  }
}
</style>
