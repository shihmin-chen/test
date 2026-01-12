<template>
  <div>
    <div class="xd-block">
      <div class="xd-column">
        <XCheckbox v-model="outline" size="sm">Outline</XCheckbox>
        <XCheckbox v-model="hideCheckmark" size="sm">HideCheckmark</XCheckbox>
        <XInputText
          v-model="customPrefixIcon"
          label="customPrefixIcon"
          placeholder="Insert any name that was defined in icon-component"
        />
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
        <XRadioButtonGroup
          v-model="selectMode"
          class="xd-space"
          name="selectMode"
          size="sm"
        >
          <label>Select mode:</label>
          <XRadioButton v-for="mode in selectModes" :key="mode" :value="mode">
            {{ mode }}
          </XRadioButton>
        </XRadioButtonGroup>
      </div>
      <div class="xd-row">
        <XChipGroup
          v-model:selected="selected"
          :items="items"
          :hideCheckmark="hideCheckmark"
          :customPrefixIcon="customPrefixIcon"
          :size="size"
          :outline="outline"
          :selectMode="selectMode"
        />
      </div>
      <div class="xd-row">
        Selected items: <PrismCode lang="js">{{ selected }} </PrismCode>
      </div>
    </div>

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>selected: string[] (v-model)</dt>
      <dd>key list of selected chips</dd>
      <dt>items: XChipGroupItem[]</dt>
      <dd>chip item list of chip group</dd>
      <dt>size: XChipGroupSize = 'md' | 'sm' (default: 'md')</dt>
      <dd>control size of the chip group</dd>
      <dt>outline: boolean = false</dt>
      <dd>outline style</dd>
      <dt>
        selectMode: XChipGroupSelectMode = 'single' | 'multi' (default:
        'single')
      </dt>
      <dd>select mode of chip group</dd>
      <dd>single: only a chip can be selected at one time</dd>
      <dd>multi: click to select or deselect the chip</dd>

      <h4>Emits</h4>
      <dt>update:selected: string[]</dt>
      <dd>update the selected v-model value when click on the chip</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XInputText from '../XInput/XInputText.vue';
import XRadioButton from '../XRadio/XRadioButton.vue';
import XRadioButtonGroup from '../XRadio/XRadioButtonGroup.vue';
import { XChipGroupSelectMode, XChipGroupSize } from './chipGroup';
import XChipGroup from './XChipGroup.vue';

const sizes: XChipGroupSize[] = ['sm', 'md'];
const selectModes: XChipGroupSelectMode[] = ['single', 'multi'];

export default defineComponent({
  name: 'XChipGroupDemo',
  tabName: 'XChipGroup',
  components: {
    XChipGroup,
    XCheckbox,
    XRadioButton,
    XRadioButtonGroup,
    XInputText,
  },
  setup() {
    return {
      sizes,
      selectModes,
      selected: ref([]),
      items: ref(
        Array.from({ length: 20 }, (_, i) => ({
          key: `item${i + 1}`,
          label: `項目 ${i + 1}`,
          disabled: i === 4,
        })),
      ),
      outline: ref(false),
      size: ref<XChipGroupSize>('md'),
      selectMode: ref<XChipGroupSelectMode>('single'),
      hideCheckmark: ref(false),
      customPrefixIcon: ref(''),
    };
  },
});
</script>
