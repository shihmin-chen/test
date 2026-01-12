<template>
  <div class="x-nav-drawer">
    <div v-for="(nodeGroup, groupIndex) in modelValue" :key="groupIndex">
      <hr v-if="groupIndex > 0" class="x-nav-drawer-divider" />
      <div
        v-if="nodeGroup.name"
        :class="{
          'x-nav-drawer-label': true,
          ...groupClass,
        }"
        :style="groupStyle"
        @click="onClickGroup(nodeGroup)"
      >
        {{ nodeGroup.name }}
      </div>
      <div v-for="(node, index) in nodeGroup.nodes" :key="index">
        <XNavDrawerMenu
          :node="node"
          :menuItemStyle="menuItemStyle"
          :lazy-render="lazyRender"
        >
          <template #default="{ childNode }">
            <slot :childNode="childNode"></slot>
          </template>
          <template #addon="{ childNode }">
            <slot name="addon" :childNode="childNode"></slot>
          </template>
        </XNavDrawerMenu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  provide,
  computed,
  reactive,
  CSSProperties,
} from 'vue';
import {
  XNavDrawerNodeGroup,
  navContextKey,
  clickItemToggleKey,
  MenuDisplayMode,
  menuDisplayKey,
} from './drawer';
import XNavDrawerMenu from './XNavDrawerMenu.vue';

export default defineComponent({
  name: 'XNavDrawer',
  components: { XNavDrawerMenu },
  props: {
    modelValue: {
      // TODOITEM: modelValue for current active item, and add menuOptions prop for menu tree?
      type: Array as PropType<XNavDrawerNodeGroup[]>,
      default: () => [],
    },
    autoActive: {
      type: String,
      default: '',
    },
    activeKey: {
      type: String,
      default: '',
    },
    clickItemToggle: {
      type: Boolean,
      default: true,
    },
    menuDisplay: {
      type: String as PropType<MenuDisplayMode>,
      default: MenuDisplayMode.Always,
    },
    groupStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    groupClass: {
      type: Object as PropType<Record<string, boolean>>,
      default: () => ({}),
    },
    menuItemStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    lazyRender: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clickGroup: (_groupNode: XNavDrawerNodeGroup) => true,
  },
  setup(props, { emit }) {
    // handel active
    const nodeKeyState = reactive({
      shouldUpdate: props.activeKey === '',
      key: props.activeKey ? computed(() => props.activeKey) : props.autoActive,
    });
    const clickItemToggleRef = ref(props.clickItemToggle);

    provide(menuDisplayKey, props.menuDisplay);
    provide(navContextKey, nodeKeyState);
    provide(clickItemToggleKey, clickItemToggleRef);

    const onClickGroup = (groupNode: XNavDrawerNodeGroup) => {
      emit('clickGroup', groupNode);
    };

    return { onClickGroup };
  },
});
</script>

<style lang="scss">
.x-nav-drawer {
  background: var(--xv-container--surface);

  &-divider {
    margin: 6px 16px;
    border-top: 1px solid rgba(38, 38, 38, 0.18);
  }

  &-label {
    height: 20px;
    padding-left: 16px;

    font-weight: var(--xv-body--body-sm--font-weight);
    font-size: var(--xv-body--body-sm--font-size);
    line-height: var(--xv-body--body-sm--line-height);
    color: var(--xv-text--low-emphasis-text);
  }
}
</style>
