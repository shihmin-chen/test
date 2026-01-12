<template>
  <div class="x-nav-drawer-demo">
    <div class="xd-block x-nav-drawer-demo-nav">
      <div class="x-nav-drawer-demo-nav-title">
        Multi-level and auto expand demo:
      </div>
      <XNavDrawer
        v-model="nodeGroups1"
        autoActive="A-item 0-0-2-1-0"
        class="x-nav-drawer-demo-nav-drawer"
      >
      </XNavDrawer>
    </div>
    <div class="xd-block x-nav-drawer-demo-page">
      Current page:
      <span class="x-nav-drawer-demo-page-title">
        {{ loadedPage }}
      </span>
    </div>
    <div class="xd-block x-nav-drawer-demo-nav">
      <div class="x-nav-drawer-demo-nav-title">All state demo:</div>
      <XNavDrawer v-model="nodeGroups2" class="x-nav-drawer-demo-nav-drawer">
      </XNavDrawer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ToggleButtonPosition, XNavDrawerNode } from './drawer';
import XNavDrawer from './XNavDrawer.vue';

export default defineComponent({
  name: 'XNavDrawerDemo',
  tabName: 'XNavDrawer',
  components: {
    XNavDrawer,
  },
  setup() {
    // simulate page load
    const loadedPage = ref('');
    const loadPage = (pageName: string) => {
      loadedPage.value = pageName;
    };
    const genDropdownItems = (name: string) => [
      {
        name: 'alert name',
        disabled: false,
        callback: () => {
          alert(name);
        },
      },
    ];

    // create multi-level data
    const numLevel = 3;
    const groupNames = ['A', 'B'];
    const numNodePerLevel = 3;
    const autoExpandNodes = ['B-item 0', 'B-item 0-1'];
    const genNode = (
      prefix: string,
      name: string,
      level: number
    ): XNavDrawerNode => {
      const newName = `${prefix}${name}`;
      const children =
        level > numLevel
          ? []
          : [...Array(numNodePerLevel).keys()].map((index) =>
              genNode('', `${newName}-${index}`, level + 1)
            );
      return {
        key: newName,
        name: newName,
        icon: children.length > 0 ? 'folder-filled' : 'document-filled',
        disabled: false,
        autoExpand: autoExpandNodes.includes(newName) ? true : false,
        callback: () => {
          loadPage(newName);
        },
        dropdownItems: genDropdownItems(newName),
        children,
      };
    };
    const nodeGroups1 = groupNames.map((groupName) => {
      return {
        name: `group ${groupName}`,
        nodes: [...Array(numNodePerLevel).keys()].map((index) =>
          genNode(`${groupName}-`, `item ${index}`, 0)
        ),
      };
    });

    // create each state data
    const nodeGroups2 = [
      {
        nodes: [
          {
            key: 'A1/',
            name: 'Folder A1 (with icon)',
            icon: 'folder-filled',
            callback: () => {
              loadPage('Folder A1');
            },
            children: [
              {
                key: 'A1/A1',
                name: 'Item A1 (with icon)',
                icon: 'document-filled',
                callback: () => {
                  loadPage('Item A1');
                },
              },
            ],
          },
          {
            key: 'A2/',
            name: 'Folder A2 (with callback)',
            callback: () => {
              loadPage('Folder A2');
            },
            children: [
              {
                key: 'A2/A2',
                name: 'Item A2 (with callback)',
                callback: () => {
                  loadPage('Item A2');
                },
              },
            ],
          },
          {
            key: 'A3/',
            name: 'Folder A3 (without callback)',
            children: [
              {
                key: 'A3/A3',
                name: 'Item A3 (without callback)',
              },
            ],
          },
          {
            key: 'A4/',
            name: 'Folder A4 (disabled)',
            disabled: true,
            callback: () => {
              loadPage('Folder A4');
            },
            children: [
              {
                key: 'A4/A4',
                name: 'Item A4 (disabled)',
                disabled: true,
                callback: () => {
                  loadPage('Item A4');
                },
              },
            ],
          },
          {
            key: 'A5/',
            name: 'Folder A5 (with dropdown)',
            dropdownItems: genDropdownItems('Folder A5'),
            callback: () => {
              loadPage('Folder A5');
            },
            children: [
              {
                key: 'A5/A5',
                name: 'Item A5 (disabled)',
                dropdownItems: genDropdownItems('Item A5'),
                callback: () => {
                  loadPage('Item A5');
                },
              },
            ],
          },
          {
            key: 'A6/',
            name: 'Folder A6 (left toggle button)',
            callback: () => {
              loadPage('Folder A6');
            },
            toggleButtonPosition: ToggleButtonPosition.Left,
            children: [
              {
                key: 'A6/A6',
                name: 'Item A6',
                callback: () => {
                  loadPage('Item A6');
                },
              },
            ],
          },
          {
            key: 'A7/',
            name: 'Folder A7 (with custom style)',
            callback: () => {
              loadPage('Folder A7');
            },
            itemStyle: {
              background: 'var(--xv-neutral--50)',
              'border-radius': '4px',
            },
            children: [
              {
                key: 'A7/A7',
                name: 'Item A7 (with custom style)',
                callback: () => {
                  loadPage('Item A7');
                },
                itemStyle: {
                  height: '48px',
                },
              },
            ],
          },
        ],
      },
    ];

    return {
      loadedPage,
      nodeGroups1,
      nodeGroups2,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-nav-drawer-demo {
  margin-bottom: 160px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 1rem;

  &-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    min-height: 600px;

    &-title {
      margin-bottom: 10px;
      font-size: 16px;
      color: var(--xv-text--medium-emphasis-text);
    }

    &-drawer {
      width: 300px;
    }
  }

  &-page {
    flex: 1;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: var(--xv-container--surface-active);

    &-title {
      font-size: 30px;
    }
  }
}
</style>
