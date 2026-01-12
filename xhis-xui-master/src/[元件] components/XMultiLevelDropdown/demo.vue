<template>
  <div class="x-multi-level-dropdown-demo">
    <div class="xd-block block-col">
      Menu bar dropdown:
      <XMultiLevelDropdown size="md" :itemGroups="itemGroups">
        選單(中)
      </XMultiLevelDropdown>
      <XMultiLevelDropdown size="sm" :itemGroups="itemGroups">
        選單(小)
      </XMultiLevelDropdown>
      <XMultiLevelDropdown :disabled="true" :itemGroups="itemGroups">
        選單(禁用)
      </XMultiLevelDropdown>
    </div>
    <div class="xd-block block-col">
      Custom target button:
      <XMultiLevelDropdown
        :itemGroups="itemGroups"
        :options="{ placement: 'bottom-end', trigger: 'mouseenter' }"
      >
        <template #dropdown-button="{ isMenuOpened }">
          <XIconButton icon="more-hori" :on="isMenuOpened" />
        </template>
      </XMultiLevelDropdown>
    </div>
    <XToast v-model:visible="toastVisible" :content="toastContent" />

    <hr class="xd-hr" />

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>size: XMultiLevelDropdownSize = 'md' | 'sm' (default: 'md')</dt>
      <dd>control size of the multi-level dropdown menu</dd>
      <dt>disabled: boolean = false</dt>
      <dd>disabled state, prevent dropdown menu from being opened</dd>
      <dt>menuMaxHeight: string (default: '80vh')</dt>
      <dd>the max height of the dropdown menu</dd>
      <dt>menuMaxWidth: string (default: '20.5rem')</dt>
      <dd>the max width of the dropdown menu</dd>
      <dt>menuMinWidth: string (default: '9rem')</dt>
      <dd>the min width of the dropdown menu</dd>
      <dt>itemGroups: XMultiLevelDropdownItemGroup[]</dt>
      <dd>the list item of multi-level dropdown menu</dd>
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
      <dt>menuOptions: Partial&lt;TippyProps&gt;</dt>
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
        to override default behavior on menu start from the 2nd layers.
      </dd>
      <dd>'menuOptions' will be overridden by 'options'.</dd>

      <h4>Slots</h4>
      <dt>default = {isMenuOpened}</dt>
      <dd>
        The content of <code class="xd-code">XMultiLevelDropdownButton</code>
      </dd>
      <dd>
        <code class="xd-code">isMenuOpened</code>
        return true if the dropdown menu is opened
      </dd>
      <dt>dropdown-button = {isMenuOpened}</dt>
      <dd>
        Replace the default
        <code class="xd-code">XMultiLevelDropdownButton</code>
      </dd>
      <dd>
        <code class="xd-code">isMenuOpened</code>
        return true if the dropdown menu is opened
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import XMultiLevelDropdown from './XMultiLevelDropdown.vue';
import XIconButton from '../XIconButton/XIconButton.vue';
import XToast from '../XToast/XToast.vue';
import {
  XMultiLevelDropdownItem,
  XMultiLevelDropdownItemGroup,
} from './dropdown';

export default defineComponent({
  name: 'XMultiLevelDropdownDemo',
  tabName: 'XMultiLevelDropdown',
  components: {
    XMultiLevelDropdown,
    XIconButton,
    XToast,
  },
  setup() {
    // toast
    const toastVisible = ref(false);
    const toastContent = ref('');
    const showToast = (name: string) => {
      toastVisible.value = true;
      toastContent.value = `點擊"${name}"`;
    };

    // define menu structure
    const itemTree = [
      {
        name: '群組1',
        items: [
          { name: '選項A (一個非常非常長的選項名稱)', children: [] },
          {
            name: '選項B',
            children: [
              {
                name: '群組3',
                items: [
                  {
                    name: '選項E',
                    children: [
                      {
                        name: '',
                        items: [{ name: '選項G', children: [] }],
                      },
                    ],
                  },
                  { name: '選項F', children: [] },
                ],
              },
            ],
          },
          { name: '選項C', children: [] },
        ],
      },
      {
        name: '群組2',
        items: [{ name: '選項D', children: [] }],
      },
    ];
    // add properties
    const createItemGroups = (
      itemGroups: Array<XMultiLevelDropdownItemGroup>
    ) =>
      itemGroups.map((itemGroup: XMultiLevelDropdownItemGroup) => ({
        name: itemGroup.name,
        items: itemGroup.items.map((item: XMultiLevelDropdownItem) => ({
          name: item.name,
          disabled: item.name === '選項C',
          children: createItemGroups(item.children),
          callback: () => {
            showToast(item.name);
          },
        })),
      }));
    const itemGroups = createItemGroups(itemTree);

    return {
      toastVisible,
      toastContent,
      itemGroups,
    };
  },
});
</script>

<style lang="scss" scoped>
.block-col {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}
</style>
