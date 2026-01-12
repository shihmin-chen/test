<template>
  <div class="x-dropdown-demo">
    <div class="xd-block" style="padding-bottom: 160px">
      <p>The overflow menu:</p>
      <div v-for="size in sizes" :key="size" class="x-dropdown-demo-row-gp">
        <span style="width: 100px">{{ size }}</span>
        <XDropdown :size="size" :items="items">
          <template #dropdownHeader>
            <div class="x-dropdown-demo-header">Header</div>
          </template>
          <template #dropdownFooter>
            <div class="x-dropdown-demo-footer">Footer</div>
          </template>
        </XDropdown>
        <XDropdown :size="size" :items="items" disabled />
        <XDropdown
          :size="size"
          :items="items"
          :options="{ placement: 'bottom-start' }"
        >
          <template #default="{ isMenuOpened }">
            <XIconButton :size="size" icon="avatar" :on="isMenuOpened" />
          </template>
        </XDropdown>
      </div>
      <XToast v-model:visible="toastVisible" :content="toastContent" />
    </div>

    <hr class="xd-hr" />

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>size: XDropdownSize = 'md' | 'sm' (default: 'md')</dt>
      <dd>control size of the dropdown</dd>
      <dt>disabled: boolean = false</dt>
      <dd>disabled state, prevent dropdown menu from being opened</dd>
      <dt>items: XDropdownItem[]</dt>
      <dd>the list item of dropdown menu</dd>
      <dt>options: Partial&lt;TippyProps&gt;</dt>
      <dd>
        partial
        <a
          class="xd-a"
          href="https://atomiks.github.io/tippyjs/v6/all-props/"
          rel="noopener"
          title="tippy.js"
        >
          tippy.js options
        </a>
        to override default behavior
      </dd>

      <h4>Slots</h4>
      <dt>default = {isMenuOpened}</dt>
      <dd>The dropdown target. Click it to open dropdown menu</dd>
      <dd>Default dropdown target is triple-dot icon button</dd>
      <dd>
        <code class="xd-code">isMenuOpened</code>
        return true if the dropdown menu is opened
      </dd>
      <dt>dropdownHeader</dt>
      <dd>The header container of dropdown menu</dd>
      <dt>dropdownList = { hideMenu }</dt>
      <dd>The dropdown list container of dropdown menu</dd>
      <dt>dropdownFooter</dt>
      <dd>The footer container of dropdown menu</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { XDropdownSize } from './dropdown';
import XDropdown from './XDropdown.vue';
import XIconButton from '../XIconButton/XIconButton.vue';
import XToast from '../XToast/XToast.vue';

const sizes: XDropdownSize[] = ['md', 'sm'];

export default defineComponent({
  name: 'XDropdownDemo',
  tabName: 'XDropdown',
  components: { XDropdown, XIconButton, XToast },
  setup() {
    const toastVisible = ref(false);
    const toastContent = ref('');
    const items = Array.from(['讀取醫事卡', '讀取健保卡', '登出'], (name) => ({
      name,
      disabled: name === '登出',
      callback: () => {
        toastVisible.value = true;
        toastContent.value = `點擊"${name}"`;
      },
    }));
    return {
      sizes,
      toastVisible,
      toastContent,
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-dropdown-demo {
  &-header {
    padding: 0.25rem 1rem;
    border-bottom: 1px solid #e0e0e0;
    color: var(--xv-text--high-emphasis-text);
  }

  &-footer {
    padding: 0.25rem 1rem;
    border-top: 1px solid #e0e0e0;
    color: var(--xv-text--medium-emphasis-text);
  }
}

.x-dropdown-demo-row-gp {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
