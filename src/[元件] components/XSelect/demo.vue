<template>
  <div>
    <div class="chunk-block">
      <div class="chunk">
        <label>Menu min width:</label>
        <XInputText v-model="baseAttrs.menuMinWidth" />
        <label>Menu max width:</label
        ><XInputText v-model="baseAttrs.menuMaxWidth" />
        <div>
          v-model value: <code class="xd-code">{{ demoValue }}</code>
        </div>
        <XSelect
          v-model="demoValue"
          :data-options="demoOptions"
          minWidth="500px"
          :menuMaxWidth="baseAttrs.menuMaxWidth"
          :menuMinWidth="baseAttrs.menuMinWidth"
        />
      </div>

      <div class="chunk">
        <div>sm</div>
        <XSelect v-model="demoValue" size="sm" :data-options="demoOptions" />
      </div>

      <div class="chunk">
        <div>Disabled</div>
        <XCheckbox v-model="disabled" size="sm">Disabled</XCheckbox>
        <XSelect
          v-model="demoValue"
          :data-options="demoOptions"
          :disabled="disabled"
        />
      </div>

      <div class="chunk white-container">
        <div>White version</div>
        <div style="font-size: 12px; color: #999">
          <span v-if="disabled">Disabled</span>
          <span v-else>Enabled</span>
          /
          <span v-if="readonly">Readonly</span>
          <span v-else>Selectable</span>
        </div>
        <XSelect
          v-model="demoValue"
          :data-options="demoOptions"
          :disabled="disabled"
          :readonly="readonly"
          theme="white"
        />
      </div>

      <div class="chunk">
        <div>Readonly</div>
        <XCheckbox v-model="readonly" size="sm">Readonly</XCheckbox>
        <XSelect
          v-model="demoValue"
          :data-options="demoOptions"
          :readonly="readonly"
        />
      </div>

      <div class="chunk">
        <div>Using with icon</div>
        <XSelect v-model="demoValue" :data-options="demoOptions">
          <template #prefix>
            <XIcon icon="search" width="16" style="margin-right: 0.25rem" />
          </template>
          <template #prefix-option>
            <img
              src="@xui-assets/icon/spinner.png"
              width="16"
              style="margin-right: 0.25rem"
            />
          </template>
        </XSelect>
      </div>

      <div class="chunk">
        <div>Custom options rendering</div>
        <XSelect v-model="demoValue" :data-options="demoOptions">
          <template #option="{ option, index }">
            <code class="xd-code">{{ index }}</code>
            <span>{{ option.label }}[{{ option.value }}]</span>
          </template>
        </XSelect>
      </div>

      <div class="chunk">
        <div>max width</div>
        <XSelect
          v-model="demoValue"
          :data-options="demoOptions"
          maxWidth="300px"
          menuMaxWidth="20px"
        />
      </div>

      <div class="chunk">
        <div>Provide style to button as normal</div>
        <XSelect
          v-model="demoValue"
          :data-options="demoOptions"
          style="background-color: #418fde; padding: 20px"
        />
      </div>

      <div class="chunk">
        <div>Provide style to menu through menuAttrs</div>
        <XSelect
          v-model="demoValue"
          :data-options="demoOptions"
          :menuAttrs="{
            style: `background-color: #418fde; height: 240px; padding: 20px;`,
          }"
        />
      </div>
    </div>

    <dl class="xd-desc">
      <h4>Prop</h4>
      <dt>modelValue: string | SelectedMenuItem.key</dt>
      <dd>Given value of this component</dd>
      <dt>size: 'sm' | 'md'</dt>
      <dd>Size of select button</dd>
      <dt>dataOptions: SelectMenuItem[]</dt>
      <dd>The combobox options</dd>
      <dt>fallbackLabel: string</dt>
      <dd>Label used when selection is not found</dd>
      <dt>theme: &apos;grey&apos; | &apos;white&apos;</dt>
      <dd>Theme color, default to grey for surface background</dd>
      <dt>disabled: boolean = false</dt>
      <dd>
        Disabled state, when set to disabled, all opened menu will be closed
      </dd>
      <dt>readonly: boolean = false</dt>
      <dd>readonly mode</dd>
      <dt>maxWidth: string</dt>
      <dd>maxWidth of the select button</dd>
      <dt>minWidth: string</dt>
      <dd>minWidth of the select button</dd>
      <dt>menuMaxWidth: string</dt>
      <dd>maxWidth of the Menu Content</dd>
      <dt>menuMinWidth: string</dt>
      <dd>minWidth of the Menu Content</dd>
      <dt>menuAttrs: Object</dt>
      <dd>
        extra attrs to pass to menu element, not recommend since it might break
        popper measurement
      </dd>
      <dt>hideIcon: boolean = false</dt>
      <dd>hide caret icon when not hovered nor clicked</dd>
      <dt>isSendingLog: boolean = false</dt>
      <dd>send logs to server</dd>

      <h4>Emits</h4>
      <dt>update:modelValue: string | SelectedMenuItem.key</dt>
      <dd>Corresponding update when value changed</dd>
      <dt>show</dt>
      <dd>menu show, tippy show relay</dd>
      <dt>hide</dt>
      <dd>menu hide, tippy hide relay</dd>

      <h4>Scoped Slot</h4>
      <dt>label: v-bind = {label: string}</dt>
      <dd>Select combobox text area, default: label content</dd>
      <dt>prefix</dt>
      <dd>Content before select combobox text area</dd>
      <dt>option: v-bind = {option: SelectedMenuItem, index: number}</dt>
      <dd>listbox options rendering template</dd>
      <dt>prefix-option: v-bind = {option: SelectedMenuItem, index: number}</dt>
      <dd>Content before list option</dd>

      <h4>Types</h4>
      <dt>SelectedMenuItem</dt>
      <dd>Option entries type</dd>
      <dt>SelectedMenuItem.key</dt>
      <dd>(Unique) Main specifier in option, will use this as model value</dd>
      <dt>SelectedMenuItem.label</dt>
      <dd>Text data to show in options list and select</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XIcon from '../XIcon/XIcon.vue';
import XInputText from '../XInput/XInputText.vue';
import { SelectMenuItem } from './index';
import XSelect from './XSelect.vue';

export default defineComponent({
  name: 'XSelectDemo',
  tabName: 'XSelect',
  components: { XSelect, XCheckbox, XIcon, XInputText },
  setup() {
    const baseAttrs = reactive({
      menuMinWidth: '12rem',
      menuMaxWidth: '15rem',
    });

    const demoOptions: SelectMenuItem[] = [
      {
        value: 'PARTIAL',
        label: '應部份負擔',
      },
      {
        value: 'HEAVY',
        label: '重病',
      },
      {
        value: 'value',
        label: '這麼長的選項你見過嗎，沒見過就讓你見識一下。',
      },
      {
        value: 'disabled',
        label: '我被disable了',
        disabled: true,
      },
    ];

    const demoValue = ref();
    return {
      baseAttrs,
      demoOptions,
      demoValue,
      disabled: ref(false),
      readonly: ref(false),
    };
  },
});
</script>

<style lang="scss" scoped>
.chunk {
  display: inline-flex;
  padding: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  outline: solid 1px #2221;
}

.chunk-block {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  flex-wrap: wrap;
}

.white-container {
  background-color: var(--xv-container--background);
}
</style>
