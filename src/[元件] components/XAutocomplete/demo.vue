<template>
  <div class="x-auto-complete-demo">
    <div class="options" style="margin-bottom: 1rem">
      <h4>Option</h4>
      <div class="xd-column">
        <div class="x-flex xd-space">
          <XCheckbox v-model="baseAttrs.combobox" size="sm">Combobox</XCheckbox>
          <XCheckbox v-model="baseAttrs.autoSelectText" size="sm">
            AutoSelectText
          </XCheckbox>
          <XCheckbox v-model="baseAttrs.disabled" size="sm">Disabled</XCheckbox>
          <XCheckbox v-model="baseAttrs.readonly" size="sm">Readonly</XCheckbox>
          <XCheckbox v-model="baseAttrs.error" size="sm">Error</XCheckbox>
          <XCheckbox v-model="baseAttrs.blurOnSelect" size="sm"
            >blurOnSelect</XCheckbox
          >
        </div>
        <XRadioButtonGroup
          v-model="baseAttrs.size"
          class="xd-space"
          name="size"
          size="sm"
        >
          <label>Size:</label>
          <XRadioButton value="sm">sm</XRadioButton>
          <XRadioButton value="md">md</XRadioButton>
        </XRadioButtonGroup>
        <div style="width: 200px">
          <label>Menu min width:</label>
          <XInputText v-model="baseAttrs.menuMinWidth" />
          <label>Menu max width:</label
          ><XInputText v-model="baseAttrs.menuMaxWidth" />
        </div>
      </div>
    </div>
    <div class="xd-column">
      <div class="chunk-block">
        <div class="chunk">
          <div>
            v-model: <code class="xd-code">{{ demo }}</code>
          </div>
          <XAutocomplete
            v-model="demo"
            v-bind="baseAttrs"
            :options="options"
            autofocus
          ></XAutocomplete>
        </div>
        <div class="chunk">
          <div>:inputAttrs="{ fill: true, }"</div>
          <XAutocomplete
            v-model="demo"
            v-bind="baseAttrs"
            :options="options"
            :inputAttrs="{
              fill: true,
            }"
          ></XAutocomplete>
        </div>
        <div class="chunk">
          <div>:inputAttrs="{ borderless: true, }"</div>
          <XAutocomplete
            v-model="demo"
            v-bind="baseAttrs"
            :options="options"
            :inputAttrs="{
              borderless: true,
            }"
          ></XAutocomplete>
        </div>
        <div class="chunk">
          <div><code class="xd-code">maxWidth: 3rem</code></div>
          <XAutocomplete
            v-model="demo"
            v-bind="baseAttrs"
            :options="options"
            :maxWidth="'3rem'"
          ></XAutocomplete>
        </div>
        <div class="chunk">
          <div>
            Call api to search: <span v-if="isLoading">loading...</span>
          </div>
          <div>
            Remember to disable built-in
            <code class="xd-code">filter</code> with
            <code class="xd-code">:filter="() => true"</code>
          </div>
          <XAutocomplete
            v-model="demo"
            v-bind="baseAttrs"
            :filter="() => true"
            :loading="isLoading"
            :options="filterOptions"
            @input="onInputChange"
          ></XAutocomplete>
        </div>
        <div class="chunk">
          <div>
            Customize <code class="xd-code">getOptionLabel</code> function
          </div>
          <XAutocomplete
            v-model="demo"
            v-bind="baseAttrs"
            :options="options"
            :getOptionLabel="(option) => option.customizeLabel"
          ></XAutocomplete>
        </div>
        <div class="chunk">
          <div>Customize option</div>
          <XAutocomplete v-model="demo" v-bind="baseAttrs" :options="options">
            <template #option="{ option }"> I am {{ option.label }} </template>
          </XAutocomplete>
        </div>
        <div class="chunk">
          <div>Customize input component</div>
          <XAutocomplete v-model="demo" v-bind="baseAttrs" :options="options">
            <template #input="{ inputAttrs }">
              <input v-bind="inputAttrs" />
            </template>
          </XAutocomplete>
        </div>
        <div class="chunk">
          <div style="display: flex; align-items: center">
            Customize filter function: (you can only see all the options by
            typing
            <img
              ref="target"
              src="@xui-assets/favicon.ico"
              alt="favicon"
              style="width: 40px; height: 40px"
            />)
          </div>
          <XAutocomplete
            v-model="demo"
            v-bind="baseAttrs"
            :options="options"
            :filter="({ queryText: x }) => x.toLocaleLowerCase() === 'aics'"
          ></XAutocomplete>
        </div>
        <div class="chunk">
          <div>
            <code class="xd-code"
              >:inputAttrs="{ type: '{{ inputType }}' }"</code
            >
          </div>
          <XAutocomplete
            v-model="demo"
            v-bind="baseAttrs"
            :options="options"
            :inputAttrs="{ type: inputType }"
          >
            <template #option="{ option }"> I am {{ option.label }} </template>
          </XAutocomplete>
          <XSelect v-model="inputType" :dataOptions="inputTypes"></XSelect>
        </div>
        <div class="chunk">
          <div>Use virtual list with huge data.</div>
          <div>
            <strong>NOTE:</strong> it's necessary to specify
            <code class="xd-code">virtualOptions.itemHeight</code> for scroll to
            work as expected
          </div>
          <XAutocomplete
            v-model="demo"
            v-bind="baseAttrs"
            :options="hugeOptions"
            virtual
            :virtualOptions="{ itemHeight: 92, overscan: 6 }"
          >
            <template #option="{ option }"
              ><div style="height: 80px">I am {{ option.label }}</div>
            </template>
          </XAutocomplete>
        </div>
      </div>
    </div>
    <dl class="xd-desc">
      <h4>Scoped Slot</h4>
      <dt>input: v-bind = {inputAttrs: object}</dt>
      <dd>input rendering template</dd>
      <dd>
        <strong>NOTE</strong> that <code class="xd-code">inputAttrs</code> is
        required to be binded as custom input attributes.
      </dd>
      <dd>
        (ex.
        <code class="xd-code">{{'<CustomInput v-bind="inputAttrs" />' }}</code>)
      </dd>
      <dt>option: v-bind = {option: object, index: number}</dt>
      <dd>listbox options rendering template</dd>
      <dt>noResult</dt>
      <dd>no result rendering template</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XInputText, { availableTypes } from '../XInput/XInputText.vue';
import XRadioButton from '../XRadio/XRadioButton.vue';
import XRadioButtonGroup from '../XRadio/XRadioButtonGroup.vue';
import XSelect from '../XSelect/XSelect.vue';
import XAutocomplete from './XAutocomplete.vue';

export default defineComponent({
  name: 'XAutocompleteDemo',
  tabName: 'XAutocomplete',
  components: {
    XAutocomplete,
    XCheckbox,
    XRadioButton,
    XRadioButtonGroup,
    XSelect,
    XInputText,
  },
  setup() {
    const baseAttrs = reactive({
      combobox: false,
      autoSelectText: true,
      disabled: false,
      readonly: false,
      error: false,
      blurOnSelect: false,
      menuMinWidth: '12rem',
      menuMaxWidth: '15rem',
      size: 'md',
    });
    const demo = ref(null);
    const isLoading = ref(false);
    const options = [...Array(10).keys()].map((option) => {
      const label =
        option % 2 === 0
          ? `Apple-${option}`
          : `VeryVeryVeryVeryVeryVeryLong-${option}`;
      return {
        label,
        value: `VALUE-${option}`,
        customizeLabel: `custom-${label}`,
        disabled: option % 3 === 0,
      };
    });
    const hugeOptions = [...Array(10000).keys()];
    const filterOptions = ref([...options]);

    const searchApi = (text: string): Promise<Array<string>> =>
      new Promise((resolve) => {
        setTimeout(() => {
          const res = options.filter((option) => {
            return (
              option.label
                .toLocaleLowerCase()
                .indexOf(text.toLocaleLowerCase()) > -1
            );
          });
          resolve(res);
        }, 1000);
      });

    const onInputChange = async (text: string) => {
      isLoading.value = true;
      filterOptions.value = await searchApi(text);
      isLoading.value = false;
    };

    const inputType = ref('search');
    const inputTypes = availableTypes.map((type) => ({
      label: type,
      value: type,
    }));

    return {
      baseAttrs,
      filterOptions,
      isLoading,
      options,
      demo,
      inputType,
      inputTypes,
      hugeOptions,
      onInputChange,
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
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
