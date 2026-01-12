<template>
  <div class="x-nav-drawer-menu">
    <!-- item -->
    <XLazyRender min-height="40px" :disable="!lazyRender">
      <div
        class="x-nav-drawer-menu-item"
        :class="{
          'x-nav-drawer-menu-item--disabled': node.disabled,
          'x-nav-drawer-menu-item--active': isActive,
          'x-nav-drawer-menu-item--non-callable': !node.callback,
        }"
        :style="{
          ...levelStyle,
          ...node.itemStyle,
        }"
        @click="
          if (clickItemToggleRef) {
            onToggle();
          }
          onItemClick();
        "
        @mouseover="onMenuItemMouseOver()"
        @mouseout="onMenuItemMouseOut()"
      >
        <XIcon size="sm" :icon="node.icon" />
        <XTooltip
          :content="node.name"
          class="x-nav-drawer-menu-item-text x-ellipsis--1"
          :aria-expanded="isExpand"
          ellipsis
        >
          <slot :childNode="node">
            {{ node.name }}
          </slot>
        </XTooltip>
        <div
          v-if="$slots['addon']"
          v-show="shouldShowMenu"
          class="x-nav-drawer-menu-item-addon-btn"
        >
          <slot name="addon" :childNode="node"></slot>
        </div>
        <XDropdown
          v-if="(node.dropdownItems?.length ?? 0) > 0"
          v-show="shouldShowMenu"
          class="x-nav-drawer-menu-item-addon-btn"
          size="sm"
          :items="node.dropdownItems"
          :itemStyle="menuItemStyle"
          @click.stop
          @setExpand="onSetExpand"
        />
        <XIconButton
          v-if="(node.children?.length ?? 0) > 0"
          class="x-nav-drawer-menu-item-addon-btn"
          size="sm"
          :icon="toggleIcon"
          :style="{
            order:
              node.toggleButtonPosition === ToggleButtonPosition.Left
                ? '-1'
                : '0',
          }"
          @click.stop
          @click="onToggle()"
        />
      </div>
    </XLazyRender>

    <!-- sub menu -->
    <div ref="menuRef" class="x-nav-drawer-menu-sub" :style="transStyle">
      <div v-for="(child, index) in node.children" :key="index">
        <XNavDrawerMenu
          :node="child"
          :level="level + 1"
          :menuItemStyle="menuItemStyle"
          @expand="onExpand"
          @relayout="onRelayout"
        >
          <!-- @vue-expect-error -->
          <template #default="{ childNode }">
            <slot :childNode="childNode"></slot>
          </template>
          <!-- @vue-expect-error -->
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
  computed,
  CSSProperties,
  inject,
  onMounted,
  watch,
} from 'vue';
import { XIcon } from '../XIcon/';
import { XIconButton } from '../XIconButton/';
import { XDropdown } from '../XDropdown/';
import { XTooltip } from '../XTooltip/';
import {
  ToggleButtonPosition,
  XNavDrawerNode,
  navContextKey,
  clickItemToggleKey,
  XActiveDrawerAction,
  menuDisplayKey,
  MenuDisplayMode,
} from './drawer';
import { XLazyRender } from '../XLazyRender';

export default defineComponent({
  name: 'XNavDrawerMenu',
  components: { XIcon, XIconButton, XDropdown, XTooltip, XLazyRender },
  props: {
    node: {
      type: Object as PropType<XNavDrawerNode>,
      default: () => ({}),
    },
    level: {
      type: Number,
      default: 0,
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
  emits: ['expand', 'relayout'],
  setup(props, { emit }) {
    const menuRef = ref<HTMLElement>();

    const nodeIsExpand = computed({
      get: () => props.node.isExpand === true,
      set: (value) => {
        if (value !== undefined) {
          props.node?.setExpand?.(value);
        }
      },
    });
    const isExpand =
      props.node.isExpand === undefined ? ref(false) : nodeIsExpand;

    const isMouseOver = ref(false);
    const isMenuOpen = ref(false);
    const onSetExpand = (value: boolean) => {
      isMenuOpen.value = value;
    };

    const toggleIcon = computed(() =>
      isExpand.value ? 'chevron-up' : 'chevron-down'
    );
    const menuHeight = ref();
    const menuChildHieght = ref(0);

    const updateMenuHeight = (childHeight = 0) => {
      const height = (menuRef.value?.scrollHeight ?? 0) + childHeight;
      menuHeight.value = isExpand.value ? `${height}px` : '0';
      menuChildHieght.value = childHeight;
      emit('relayout', height + childHeight);
    };

    watch([() => props.node.children, isExpand], () => updateMenuHeight(), {
      flush: 'post',
    });

    // handel item click and set active
    const nodeKeyState = inject(navContextKey, {
      shouldUpdate: true,
      key: '',
    });
    const clickItemToggleRef = inject(clickItemToggleKey, ref(true));

    const menuDisplay = inject(menuDisplayKey, 'always');

    const shouldShowMenu = computed(() => {
      // use per-node setting if exsist, otherwise use global setting
      const display = props.node.displayMenu || menuDisplay;

      switch (display) {
        case MenuDisplayMode.Always:
          return true;
        case MenuDisplayMode.Hover:
          return isMouseOver.value || isMenuOpen.value;
        case MenuDisplayMode.Hide:
          return false;
        default:
          throw new Error(`"${display}" is not a correct menu display mode!`);
      }
    });

    const isActive = computed(() => {
      return nodeKeyState.key === props.node.key;
    });
    const onItemClick = async () => {
      if (props.node.disabled || !props.node.callback) {
        return;
      }
      const drawerAction = await props.node.callback();
      if (
        !props.node.unselectable &&
        (!drawerAction || drawerAction !== XActiveDrawerAction.Fix)
      ) {
        if (nodeKeyState.shouldUpdate) {
          nodeKeyState.key = props.node.key;
        }
      }
    };
    const onToggle = () => {
      if ((props.node.children?.length ?? 0) > 0) {
        isExpand.value = !isExpand.value;
      }
    };

    const onMenuItemMouseOver = () => {
      isMouseOver.value = true;
    };

    const onMenuItemMouseOut = () => {
      isMouseOver.value = false;
    };

    const onExpand = () => {
      isExpand.value = true;
      emit('expand');
    };

    const onRelayout = (childHeight = 0) => {
      updateMenuHeight(childHeight);
    };

    // handle level style change
    const levelStyle = computed<CSSProperties>(() => {
      const indent = (props.level + 1) * 16;
      return {
        'padding-left': `${indent}px`,
      };
    });

    // handle auto expand and auto active
    const transStyle = computed<CSSProperties>(() => ({
      transition: 'max-height 0.3s ease-out',
      maxHeight: menuHeight.value,
    }));
    onMounted(() => {
      if (props.node.autoExpand && (props.node.children?.length ?? 0) > 0) {
        isExpand.value = true;
      }
      if (menuRef.value) {
        menuRef.value.ontransitionstart = () => {
          const height = menuRef.value?.scrollHeight ?? 0;
          emit('relayout', height + menuChildHieght.value);
        };
      }
      if (isActive.value) {
        onItemClick();
        emit('expand');
      }
      updateMenuHeight();
    });

    return {
      ToggleButtonPosition,
      menuRef,
      isExpand,
      toggleIcon,
      isActive,
      onItemClick,
      onToggle,
      onMenuItemMouseOver,
      onMenuItemMouseOut,
      onExpand,
      onRelayout,
      levelStyle,
      transStyle,
      menuHeight,
      clickItemToggleRef,
      onSetExpand,
      shouldShowMenu,
    };
  },
});
</script>

<style lang="scss">
.x-nav-drawer-menu {
  --x-nav-drawer-menu-background-hover: var(--xv-container--surface-hovered);

  &-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    height: 40px;
    background: var(--xv-container--surface);

    font-size: var(--xv-title--title-sm--font-size);
    font-weight: var(--xv-title--title-sm--font-weight);
    line-height: var(--xv-title--title-sm--line-height);
    letter-spacing: 0em;
    text-align: left;
    color: var(--xv-text--high-emphasis-text);

    &:hover:not(&--disabled) {
      background: var(--x-nav-drawer-menu-background-hover);
    }
    &:active:not(&--disabled) {
      background: var(--xv-container--surface-pressed);
    }

    &--non-callable {
      font-weight: 600;
      color: var(--xv-text--medium-emphasis-text);
    }
    &--active {
      background: var(--xv-container--surface-active);
      color: var(--xv-primary--500);

      &:hover:not(&--disabled) {
        background: var(--xv-container--surface-active-hovered);
      }
      &:active:not(&--disabled) {
        background: var(--xv-container--surface-active-pressed);
      }
    }
    &--disabled {
      cursor: default;
      background: var(--xv-container--surface);
      color: var(--xv-text--disabled-text);
    }

    &-text {
      flex: 1;
      padding-left: 4px;
    }

    &-addon-btn {
      margin-right: 4px;
    }
  }

  &-sub {
    overflow: hidden;
  }
}
</style>
