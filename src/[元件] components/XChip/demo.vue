<template>
  <div>
    <div class="xd-block">
      <div class="x-flex xd-space">
        <XCheckbox v-model="checked" size="sm">Checked</XCheckbox>
        <XCheckbox v-model="hideCheckmark" size="sm">HideCheckmark</XCheckbox>
        <XCheckbox v-model="disabled" size="sm">Disabled</XCheckbox>
        <XCheckbox v-model="outline" size="sm">Outline</XCheckbox>
        <XInputText
          v-model="customPrefixIcon"
          label="customPrefixIcon"
          placeholder="Insert any name that was defined in icon-component"
        />
      </div>
      <div v-for="size in sizes" :key="size" class="xd-row">
        {{ size }}
        <XChip
          v-model:checked="checked"
          :size="size"
          :hideCheckmark="hideCheckmark"
          :customPrefixIcon="customPrefixIcon"
          :outline="outline"
          :disabled="disabled"
        >
          標籤
        </XChip>
      </div>
    </div>

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>checked: boolean = false (v-model)</dt>
      <dd>checked state, show the checkmark icon to the left of label</dd>
      <dt>size: XChipSize = 'md' | 'sm' (default: 'md')</dt>
      <dd>control size of the chip</dd>
      <dt>outline: boolean = false</dt>
      <dd>outline style</dd>
      <dt>disabled: boolean = false</dt>
      <dd>disabled state, prevent chip from being clicked</dd>

      <h4>Emits</h4>
      <dt>update:checked: boolean</dt>
      <dd>update the checked v-model value when click on the chip</dd>

      <h4>Slots</h4>
      <dt>default = { color: &apos;var(--x-chip-color)&apos; }</dt>
      <dd>label of chip, also provide corresponding text color</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XInputText from '../XInput/XInputText.vue';
import { XChipSize } from './chip';
import XChip from './XChip.vue';

const sizes: XChipSize[] = ['md', 'sm'];

export default defineComponent({
  name: 'XChipDemo',
  tabName: 'XChip',
  components: {
    XChip,
    XCheckbox,
    XInputText,
  },
  setup() {
    return {
      sizes,
      disabled: ref(false),
      outline: ref(false),
      checked: ref(false),
      hideCheckmark: ref(false),
      customPrefixIcon: ref(''),
    };
  },
});
</script>
