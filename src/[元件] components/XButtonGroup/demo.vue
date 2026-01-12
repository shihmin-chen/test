<template>
  <div>
    <div
      class="xd-block"
      style="background-color: var(--xv-container--background)"
    >
      <div class="xd-column">
        <div class="x-flex xd-space">
          <XCheckbox v-model="disabled" size="sm">Disabled</XCheckbox>
          <XCheckbox v-model="on" size="sm">On (active)</XCheckbox>
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
        <h3>Button Group</h3>
        <div v-for="theme in themes" :key="theme" class="xd-row">
          <span class="theme-tag">{{ theme }}:</span>
          <XButtonGroup :theme="theme" :size="size" :outline="outline">
            <XButtonGroupItem :disabled="disabled" :on="on" label="標籤" />
            <XButtonGroupItem
              :disabled="disabled"
              :on="on"
              label="標籤"
              caret
            />
            <XButtonGroupItem
              :disabled="disabled"
              :on="on"
              icon="avatar"
              label="標籤"
            />
            <XButtonGroupItem
              :disabled="disabled"
              :on="on"
              icon="avatar"
              label="標籤"
              caret
            />
            <XButtonGroupItem :disabled="disabled" :on="on" icon="avatar" />
          </XButtonGroup>
        </div>
        <h3>Button Group Item</h3>
        <div v-for="theme in themes" :key="theme" class="xd-row">
          <span class="theme-tag">{{ theme }}:</span>
          <XButtonGroupItem
            :theme="theme"
            :size="size"
            :disabled="disabled"
            :on="on"
            label="標籤"
          />
          <XButtonGroupItem
            :theme="theme"
            :size="size"
            :disabled="disabled"
            :on="on"
            label="標籤"
            caret
          />
          <XButtonGroupItem
            :theme="theme"
            :size="size"
            :disabled="disabled"
            :on="on"
            icon="avatar"
            label="標籤"
          />
          <XButtonGroupItem
            :theme="theme"
            :size="size"
            :disabled="disabled"
            :on="on"
            icon="avatar"
            label="標籤"
            caret
          />
          <XButtonGroupItem
            :theme="theme"
            :size="size"
            :disabled="disabled"
            :on="on"
            icon="avatar"
          />
        </div>
      </div>

      <hr class="xd-hr" />

      <div>
        <h3>Using with dropdown menu:</h3>
        <XButtonGroup :size="size" :outline="outline">
          <XDropdown
            :size="size"
            :disabled="disabled"
            :items="dropdownItems"
            :options="{
              placement: 'bottom-start',
              offset: [0, 0],
              hideOnClick: false,
              onClickOutside: (instance) => {
                instance.hide();
              },
            }"
          >
            <template #default="{ isMenuOpened }">
              <XButtonGroupItem
                :disabled="disabled"
                :on="isMenuOpened"
                label="XDropdown"
                caret
              />
            </template>
          </XDropdown>
          <XMultiLevelDropdown
            :size="size"
            :disabled="disabled"
            :itemGroups="dropdownItemGroups"
          >
            <template #dropdown-button="{ isMenuOpened }">
              <XButtonGroupItem
                :disabled="disabled"
                :on="isMenuOpened"
                label="XMultiLevelDropdown"
                caret
              />
            </template>
          </XMultiLevelDropdown>
        </XButtonGroup>
      </div>
    </div>

    <dl class="xd-desc">
      <h3>XButtonGroup</h3>
      <h4>Props</h4>
      <dt>
        theme: XButtonGroupTheme = 'primary' | 'neutral' (default: 'primary')
      </dt>
      <dd>color theme to use</dd>
      <dt>size: XButtonGroupSize = 'md' | 'sm' (default: 'md')</dt>
      <dd>control size of the button</dd>
      <dt>outline: boolean = false</dt>
      <dd>outline style</dd>

      <h4>Slots</h4>
      <dt>default</dt>
      <dd>The container for button group item</dd>
    </dl>

    <dl class="xd-desc">
      <h3>XButtonGroupItem</h3>
      <h4>Props</h4>
      <dt>
        theme: XButtonGroupTheme = 'primary' | 'neutral' (default: 'primary')
      </dt>
      <dd>color theme to use</dd>
      <dt>size: XButtonGroupSize = 'md' | 'sm' (default: 'md')</dt>
      <dd>control size of the button</dd>
      <dt>icon: string | Object</dt>
      <dd>
        If provide, icon will be render using <code class="xd-code">XIcon</code>
      </dd>
      <dt>label: string</dt>
      <dd>text content</dd>
      <dt>caret: boolean = false</dt>
      <dd>whether to show the caret down icon on the right</dd>
      <dt>disabled: boolean = false</dt>
      <dd>button disabled state</dd>
      <dt>on: boolean = false</dt>
      <dd>button opened state</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { XButtonGroupSize, XButtonGroupTheme } from './buttonGroup';
import XButtonGroup from './XButtonGroup.vue';
import XButtonGroupItem from './XButtonGroupItem.vue';
import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XDropdown from '../XDropdown/XDropdown.vue';
import XMultiLevelDropdown from '../XMultiLevelDropdown/XMultiLevelDropdown.vue';
import XRadioButtonGroup from '../XRadio/XRadioButtonGroup.vue';
import XRadioButton from '../XRadio/XRadioButton.vue';

const themes: XButtonGroupTheme[] = ['primary', 'neutral'];
const sizes: XButtonGroupSize[] = ['sm', 'md'];

const dropdownItems = Array.from({ length: 2 }, (_, i) => ({
  name: `選項 ${i + 1}`,
}));

const dropdownItemGroups = [
  {
    name: '',
    items: dropdownItems,
  },
];

export default defineComponent({
  name: 'XButtonGroupDemo',
  tabName: 'XButtonGroup',
  components: {
    XButtonGroup,
    XButtonGroupItem,
    XCheckbox,
    XDropdown,
    XMultiLevelDropdown,
    XRadioButtonGroup,
    XRadioButton,
  },
  setup() {
    return {
      disabled: ref(false),
      on: ref(false),
      outline: ref(false),
      sizes,
      size: ref<XButtonGroupSize>('md'),
      themes,
      dropdownItems,
      dropdownItemGroups,
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
