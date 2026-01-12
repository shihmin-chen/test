<template>
  <div class="sidebar">
    <div class="sidebar-container x-scroll-bar">
      <template v-for="(sublist, groupName) in sortedList" :key="groupName">
        <ul class="sidebar-ul">
          <div class="sidebar-li-group">{{ groupName }}</div>
          <li
            v-for="entry in sublist"
            :key="entry.path"
            class="sidebar-li"
            :class="{
              'sidebar-li--active': entry.path === index,
            }"
            tabindex="0"
            @click="$emit('update', entry.path)"
            @keypress.prevent.enter="$emit('update', entry.path)"
            @keypress.prevent.space="$emit('update', entry.path)"
          >
            <span class="x-ellipsis--1">
              {{ entry.entry?.default?.tabName || entry.subpath }}
            </span>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

type GlobEagerFiles = Record<
  string,
  {
    [key: string]: any;
  }
>;

const srcStrip = (s: string): string => {
  return s.split('../src/')[1];
};

const demoStrip = (s: string): string => {
  return s.split('/demo')[0];
};

const firstLayer = (s: string): string => {
  return s.split('/')[0];
};

export default defineComponent({
  props: {
    list: {
      default: () => ({}),
      type: Object as PropType<GlobEagerFiles>,
    },
    index: {
      default: null,
      type: String,
    },
  },
  emits: ['update'],
  setup(props) {
    const sortedList = computed(() => {
      let list: Record<
        string,
        {
          index: number;
          entry: any;
          path: string;
          subpath: string;
        }[]
      > = {};

      Object.entries(props.list).forEach(([path, entry], index) => {
        const subpath = demoStrip(srcStrip(path));
        const key = firstLayer(subpath);
        list[key] ??= [];
        list[key].push({ index, path, entry, subpath });
      });

      return list;
    });

    return {
      sortedList,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 2rem;
  bottom: 0;
  left: 0;
  width: var(--x-sidebar-width);

  &-container {
    height: calc(100% - 2rem);
    margin: 1rem;
    padding: 0;
    padding-bottom: 1.5rem;
    border-radius: 16px;
    background-color: white;
    overflow: auto;
  }
  &-ul {
    list-style: none;
    margin: 0 1rem;
    padding: 0;
  }
  &-li {
    padding: 0 0.5rem;
    height: 48px;
    display: flex;
    justify-content: start;
    align-items: center;
    cursor: pointer;
    background-color: #f2f2f2;
    color: #212121;
    font-weight: 500;
    transition: padding 0.1s, background-color 0.1s;
    background-clip: padding-box;

    &:focus-visible {
      outline: 2px solid #22c2;
      background-color: #ddd;
    }

    &:hover {
      background-color: #ddd;
    }

    &:last-of-type {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    &-group {
      position: sticky;
      top: 0;
      padding: 1rem 0 0.5rem 0;
      color: rgb(36, 110, 207);
      background-color: white;
      text-transform: capitalize;
      text-align: left;
      font-size: small;
      font-weight: bold;
      z-index: 1;

      & + .sidebar-li {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
    }

    &--active {
      color: rgb(26, 117, 179);
      padding-left: 1rem;
      background-color: rgb(16, 143, 228, 0.08);
      position: relative;
      font-weight: 900;
      &::after {
        content: '';
        position: absolute;
        display: inline-block;
        height: calc(100% - 16px);
        left: 4px;
        width: 4px;
        border-radius: 4px;
        background-color: rgb(16, 143, 228);
      }
    }
  }
}
</style>
