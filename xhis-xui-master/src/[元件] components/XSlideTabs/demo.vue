<template>
  <div>
    <div class="xd-column" style="margin-bottom: 10px">
      <XRadioButtonGroup v-model="size" class="xd-space" name="size" size="sm">
        <label>Size:</label>
        <XRadioButton v-for="sz in sizes" :key="sz" :value="sz">
          {{ sz }}
        </XRadioButton>
      </XRadioButtonGroup>

      <XRadioButtonGroup
        v-model="hasDivideLine"
        class="xd-space"
        name="divideline"
        size="sm"
      >
        <label>Divide Line:</label>
        <XRadioButton
          v-if="theme === 'minimal'"
          :value="true"
          label="True"
          disabled
        />
        <XRadioButton v-else :value="true" label="True" />
        <XRadioButton :value="false" label="False" />
      </XRadioButtonGroup>

      <XRadioButtonGroup
        v-model="theme"
        class="xd-space"
        name="theme"
        size="sm"
      >
        <label>Theme:</label>
        <XRadioButton value="filledWhite" label="filledWhite" />
        <XRadioButton
          value="filledWhiteWithBorder"
          label="filledWhiteWithBorder"
        />
        <XRadioButton value="filledGrey" label="filledGrey" />
        <XRadioButton value="minimal" label="minimal" />
      </XRadioButtonGroup>

      <XRadioButtonGroup
        v-model="disabled"
        class="xd-space"
        name="disabled"
        size="sm"
      >
        <label>Disabled:</label>
        <XRadioButton :value="true" label="True" />
        <XRadioButton :value="false" label="False" />
      </XRadioButtonGroup>
    </div>

    <div class="xd-hr"></div>
    <div class="xd-block" style="min-height: 100px">
      <XSlideTabs
        v-model:modelValue="modelValue_4"
        :buttonOptions="buttonOptions_4"
        :size="size"
        :theme="theme"
        :hasDivideLine="hasDivideLine"
        :disabled="disabled"
      ></XSlideTabs>

      <div
        class="xd-content"
        style="margin: 1rem 0; border: 1px solid #000; text-align: center"
      >
        {{ modelValue_4 }}
      </div>
    </div>

    <div class="xd-hr"></div>
    <h3 style="margin: 10px 0">Custom Container Style (not use theme)</h3>
    <div class="xd-column" style="margin-bottom: 10px">
      <XInputText v-model="backgroundColor" label="Container BackgroundColor" />
      <XInputText v-model="border" label="Container Border" />
    </div>

    <div class="xd-hr"></div>
    <div class="xd-block" style="min-height: 100px">
      <XSlideTabs
        v-model:modelValue="modelValue_1"
        :buttonOptions="buttonOptions_1"
        :size="size"
        :containerStyle="containerStyle"
        :hasDivideLine="hasDivideLine"
        :disabled="disabled"
      ></XSlideTabs>

      <div
        class="xd-content"
        style="margin: 1rem 0; border: 1px solid #000; text-align: center"
      >
        {{ modelValue_1 }}
      </div>
    </div>

    <div class="xd-block" style="min-height: 100px">
      <XSlideTabs
        v-model:modelValue="modelValue_2"
        :buttonOptions="buttonOptions_2"
        :size="size"
        :containerStyle="containerStyle"
        :hasDivideLine="hasDivideLine"
        :disabled="disabled"
      ></XSlideTabs>

      <div
        class="xd-content"
        style="margin: 1rem 0; border: 1px solid #000; text-align: center"
      >
        {{ modelValue_2 }}
      </div>
    </div>

    <div class="xd-block" style="min-height: 100px">
      <div style="margin: 10px">XSlideTabs on XDialogue</div>

      <XButton class="demo-btn" @click="showDialogue3">Show XDialogue</XButton>

      <XDialogue id="single-dialogue" v-model:show="show3">
        <div class="dialogue-container">
          <XSlideTabs
            v-if="show3"
            v-model:modelValue="modelValue_3"
            :buttonOptions="buttonOptions_3"
            :size="size"
            :containerStyle="containerStyle"
            :hasDivideLine="hasDivideLine"
            :disabled="disabled"
          ></XSlideTabs>

          <XButton class="x-button" @click="closeDialogue3"
            >Close Dialogue</XButton
          >
        </div>
      </XDialogue>
    </div>

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>modelValue: string (default = '')</dt>
      <dd>model value of selected nav button</dd>
      <dt>buttonOptions: XTabItem[]</dt>
      <dd>
        button option list where each element is {label: '..', value: '..'}
      </dd>
      <dt>size: 'sm' | 'md' | 'lg' (default: 'md')</dt>
      <dd>size for label</dd>
      <dt>
        theme: 'filledWhite' | 'filledWhiteWithBorder' | 'filledGrey' |
        'minimal' (default: 'filledWhite')
      </dt>
      <dd>containerStyle theme</dd>
      <dt>containerStyle</dt>
      <dd>inject css for container style rather than using theme</dd>
      <dt>hasDivideLine: boolean (default: true)</dt>
      <dd>has divide line among tab items or not</dd>
      <dt>disabled: boolean (default: false)</dt>
      <dd>can click button or not</dd>

      <h4>Emit</h4>
      <dt>update:modelValue: string</dt>
      <dd>v-model updater</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed, CSSProperties } from 'vue';

import { XSlideTabsTheme, XTabItem, XTabItemSize } from './XTabItem';

import XRadioButtonGroup from '../XRadio/XRadioButtonGroup.vue';
import XRadioButton from '../XRadio/XRadioButton.vue';
import XDialogue from '../XDialogue/XDialogue.vue';
import XButton from '../XButton/XButton.vue';
import XInputText from '../XInput/XInputText.vue';

import XSlideTabs from './XSlideTabs.vue';

export default defineComponent({
  name: 'XSlideTabsDemo',
  tabName: 'XSlideTabs',
  components: {
    XRadioButtonGroup,
    XRadioButton,
    XSlideTabs,
    XDialogue,
    XButton,
    XInputText,
  },
  setup() {
    const size: Ref<XTabItemSize> = ref('md');
    const sizes: XTabItemSize[] = ['sm', 'md', 'lg'];
    const theme: Ref<XSlideTabsTheme> = ref('filledWhite');
    const backgroundColor = ref('var(--xv-container--surface-hovered)');
    const border = ref('1px solid var(--xv-text--dividing-line)');
    const containerStyle = computed(() => {
      return {
        backgroundColor: backgroundColor.value,
        border: border.value,
      } as CSSProperties;
    });
    const hasDivideLine = ref(true);
    const disabled = ref(false);

    const modelValue_1 = ref('A');
    const buttonOptions_1: XTabItem[] = [
      { label: 'NavA', value: 'A' },
      { label: 'NavB', value: 'B' },
      { label: 'NavC', value: 'C' },
      { label: 'NavD', value: 'D' },
      { label: 'NavE', value: 'E' },
    ];

    const modelValue_2 = ref('細胞學modelValue');
    const buttonOptions_2: XTabItem[] = [
      { label: '解剖病理', value: '解剖病理modelValue' },
      { label: '細胞學', value: '細胞學modelValue' },
      { label: '抹片', value: '抹片modelValue' },
    ];

    const modelValue_3 = ref('細胞學modelValue');
    const buttonOptions_3: XTabItem[] = [
      { label: '解剖病理', value: '解剖病理modelValue' },
      { label: '細胞學', value: '細胞學modelValue' },
      { label: '抹片', value: '抹片modelValue' },
    ];

    const show3 = ref(false);
    const showDialogue3 = () => {
      show3.value = true;
    };
    const closeDialogue3 = () => {
      show3.value = false;
    };

    const modelValue_4 = ref('A');
    const buttonOptions_4: XTabItem[] = [
      { label: 'TabA', value: 'A' },
      { label: 'TabB', value: 'B' },
      { label: 'TabC', value: 'C' },
      { label: 'TabD', value: 'D' },
      { label: 'TabE', value: 'E' },
    ];

    return {
      size,
      sizes,
      theme,
      backgroundColor,
      border,
      containerStyle,
      hasDivideLine,
      disabled,
      // demo1
      modelValue_1,
      buttonOptions_1,
      // demo2
      modelValue_2,
      buttonOptions_2,
      // demo3
      modelValue_3,
      buttonOptions_3,
      show3,
      showDialogue3,
      closeDialogue3,
      // demo4
      modelValue_4,
      buttonOptions_4,
    };
  },
});
</script>
<style scoped>
.dialogue-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 0;
  row-gap: 10px;
}

.input-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;
  margin-bottom: 10px;
}
</style>
