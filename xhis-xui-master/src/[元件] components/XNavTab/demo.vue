<template>
  <div class="block">
    <XRadioButtonGroup v-model="size" class="xd-space" name="size" size="sm">
      <label>Size:</label>
      <XRadioButton value="md">md</XRadioButton>
      <XRadioButton value="lg">lg</XRadioButton>
    </XRadioButtonGroup>
    <h4>Color of Selected Tab:</h4>
    <XInputText v-model="colorOfSelectedTab" />
    <hr />
    <XNavTab
      :colorOfSelectedTab="colorOfSelectedTab"
      :tabList="tabList"
      :currentTabName="tabName"
      :size="size"
      @change="setTabName"
    />
    <div class="demo-block">Current Tab: {{ tabName }}</div>
    <XNavTab
      :colorOfSelectedTab="colorOfSelectedTab"
      :tabList="tabList"
      :currentTabName="tabName"
      :size="size"
      :minWidth="`120px`"
      @change="setTabName"
    />

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>tabList: TabEntry[]</dt>
      <dd>Tab List</dd>
      <dt>currentTabName: string</dt>
      <dd>defined which one is selected</dd>
      <dt>gap: string</dt>
      <dd>gap between tabs</dd>
      <dt>minWidth: string</dt>
      <dd>tab's min width</dd>
      <dt>size: &apos;md&apos; | &apos;lg&apos;</dt>
      <dd>for title, label</dd>
      <dt>colorOfSelectedTab: string</dt>
      <dd>the color of the selected tab</dd>

      <h4>Emit</h4>
      <dt>change: string</dt>
      <dd>change tab name</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import XInputText from '../XInput/XInputText.vue';
import XRadioButton from '../XRadio/XRadioButton.vue';
import XRadioButtonGroup from '../XRadio/XRadioButtonGroup.vue';
import { TabEntry, XNavTab } from './index';

const tabList: TabEntry[] = [
  {
    name: 'tab1',
    displayName: 'Demo 01',
  },
  {
    name: 'tab2',
    displayName: 'Demo 02',
    mark: true,
  },
  {
    name: 'tab3',
    displayName: 'Demo 03 (disabled)',
    disabled: true,
  },
  {
    name: 'tab4',
    displayName: 'Demo 04 (disabled)',
    disabled: true,
    mark: true,
  },
];

export default defineComponent({
  name: 'XNavTabDemo',
  tabName: 'XNavTab',
  components: { XNavTab, XRadioButtonGroup, XRadioButton, XInputText },
  setup() {
    const tabName = ref(tabList[0].name);
    const setTabName = (name: string) => {
      tabName.value = name;
    };
    const colorOfSelectedTab = ref('var(--xv-text--high-emphasis-text)');
    return {
      tabList,
      tabName,
      setTabName,
      size: ref<'md' | 'lg'>('md'),
      colorOfSelectedTab,
    };
  },
});
</script>

<style lang="scss" scoped>
.block {
  display: flex;
  flex-direction: column;
}
.demo-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  border: 1px solid #000;
  width: 310px;
  height: 100px;
}
</style>
