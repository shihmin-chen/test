<template>
  <div>
    <h3>Usage</h3>
    <div class="xd-block">
      <div class="x-flex xd-space">
        <XCheckbox v-model="disabled" size="sm">Disabled</XCheckbox>
        <XCheckbox v-model="rounded" size="sm">Rounded</XCheckbox>
        <XCheckbox v-model="fill" size="sm">Fill</XCheckbox>
        <XCheckbox v-model="on" size="sm">On (active)</XCheckbox>
      </div>

      <hr class="xd-hr" />

      <template v-for="theme in themes" :key="theme">
        <div class="xd-row">
          {{ theme ? theme : 'undefined' }}
          <XIconButton
            :theme="theme"
            :rounded="rounded"
            :fill="fill"
            :disabled="disabled"
            :on="on"
            icon="search"
          />
        </div>
      </template>

      <hr class="xd-hr" />

      <template v-for="name in sizes" :key="name">
        <div class="xd-row">
          {{ name }}
          <XIconButton
            :size="name"
            :rounded="rounded"
            :fill="fill"
            :disabled="disabled"
            :on="on"
            icon="search"
          />
        </div>
      </template>

      <hr class="xd-hr" />

      <p>Text beside icon:</p>
      <div class="x-flex-center xd-space">
        <template v-for="size in sizes" :key="size">
          <XIconButton
            :size="size"
            :rounded="rounded"
            :fill="fill"
            :disabled="disabled"
            :on="on"
            long
            icon="avatar"
            text="Michelangelo"
          />
        </template>
      </div>

      <hr class="xd-hr" />

      <p>Custom icon:</p>
      <div class="x-flex-center xd-space">
        <XIconButton
          :rounded="rounded"
          :fill="fill"
          :disabled="disabled"
          :on="on"
          long
        >
          <XIcon icon="delete" style="margin-right: 8px" />
          <span style="margin-right: 2px">Delete the record</span>
        </XIconButton>
      </div>
      <p>You should take care of the icon and text padding yourself!</p>
    </div>

    <section>
      <h3>Heads up</h3>
      <p>
        You should always use this component with
        <strong><code class="xd-code">XIcon</code></strong>
        , since the color variable is automatically set as button color. Also
        the size will be set to smaller one when size is small.
      </p>
    </section>

    <hr class="xd-hr" />

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>size: XButtonSize = 'md' | 'sm' | 'lg' (default: 'md')</dt>
      <dd>control size of the button</dd>
      <dt>rounded: boolean = true</dt>
      <dd>square or rounded corner, default is rounded one</dd>
      <dt>fill: boolean = false</dt>
      <dd>filled style</dd>
      <dt>long: boolean = false</dt>
      <dd>
        Icon button keep the width and height fixed at 1:1 ratio. If any text
        need to show up beside icon, use long to provide unset width and padding
        style.
      </dd>
      <dt>on: boolean = false</dt>
      <dd>Activation state, icon color will not change.</dd>
      <dt>icon: string | Object</dt>
      <dd>
        If provide, icon will be render using <code class="xd-code">XIcon</code>
      </dd>
      <dt>text: string</dt>
      <dd>If provide, text will appear to the right of the icon</dd>

      <h4>Slots</h4>
      <dt>default = { size, rounded, fill, long, on }</dt>
      <dd>The icon button container</dd>
      <dd>
        You should always use this component with
        <code class="xd-code">XIcon</code>
        , and DO NOT provide color attribute if you want to apply default
        hover/focus/active/disabled state icon color.
      </dd>
      <dd>
        Incase anyone want to control the rendering themselves, those props is
        re-bound to the default slot. See the implementation for detail.
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XIconButton from './XIconButton.vue';
import { XButtonTheme, XButtonSize } from '../../shared';
import { XIcon } from '../XIcon/';

const themes: (XButtonTheme | undefined)[] = [
  undefined,
  'primary',
  'tertiary',
  'danger',
  'warning',
];
const sizes: XButtonSize[] = ['sm', 'md', 'lg'];

export default defineComponent({
  name: 'XIconButtonDemo',
  tabName: 'XIconButton',
  components: {
    XCheckbox,
    XIconButton,
    XIcon,
  },
  setup() {
    return {
      disabled: ref(false),
      themes,
      sizes,
      rounded: ref(true),
      fill: ref(false),
      on: ref(false),
    };
  },
});
</script>
