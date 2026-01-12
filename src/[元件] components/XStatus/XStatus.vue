<template>
  <div class="x-status-element">
    <div class="x-status-element-figure">
      <slot name="figure">
        <img
          :class="{ 'x-status-element-figure--rotate': type === 'loading' }"
          :src="predefined.figurePath"
          alt=""
        />
      </slot>
    </div>

    <div class="x-status-element-title">
      <slot>{{ predefined.title }}</slot>
    </div>
    <div class="x-status-element-desc">
      <slot name="description">{{ predefined.description }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
// assets
import notFound from '@xui-assets/img/not-found.svg';
import empty from '@xui-assets/img/empty.svg';
import notSelect from '@xui-assets/img/not-select.svg';
import noDataAvailable from '@xui-assets/img/no-data-available.svg';
import noItems from '@xui-assets/img/no-items.svg';
import error from '@xui-assets/img/error.svg';
import success from '@xui-assets/img/success.svg';
import warning from '@xui-assets/img/warning.svg';
import spinner from '@xui-assets/icon/spinner.png';
import { computed } from 'vue';

export interface XStatusType {
  figurePath?: string;
  title: string;
  description?: string;
}

export type XStatusDefinedTypes =
  | 'notFound'
  | 'empty'
  | 'notSelect'
  | 'noDataAvailable'
  | 'noItems'
  | 'error'
  | 'success'
  | 'warning'
  | 'loading';

export const xStatusTypes: Record<XStatusDefinedTypes, XStatusType> = {
  notFound: {
    figurePath: notFound,
    title: '找不到相符的項目',
    description: '試著調整篩選條件以找到資料',
  },
  empty: {
    figurePath: empty,
    title: '沒有任何項目',
    description: '\u00A0', // given a non-breaking space
  },
  notSelect: {
    figurePath: notSelect,
    title: '尚未選取任何項目',
    description: '選取項目以開始瀏覽',
  },
  noDataAvailable: {
    figurePath: noDataAvailable,
    title: '沒有可顯示數據',
  },
  noItems: {
    figurePath: noItems,
    title: '無任何數據可顯示',
  },
  error: {
    figurePath: error,
    title: '某些環節出錯了',
    description: '試著重新操作一次或者聯絡 IT 人員取得協助',
  },
  success: {
    figurePath: success,
    title: '成功',
  },
  warning: {
    figurePath: warning,
    title: '警告',
  },
  loading: {
    figurePath: spinner,
    title: '讀取中',
  },
};
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<{ type: XStatusDefinedTypes }>(), {
  type: 'empty',
});
const predefined = computed(() => xStatusTypes[props.type]);
</script>

<style lang="scss" scoped>
@keyframes x-rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.x-status-element {
  // --x-status-element-size: 128px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
  gap: 8px;

  &-figure {
    // width: var(--x-status-element-size);
    // height: var(--x-status-element-size);
    margin-bottom: 8px;
    -webkit-user-drag: none;

    &--rotate {
      animation: x-rotate linear 1s infinite;
    }
  }

  &-title {
    font-weight: var(--xv-title--title-lg--font-weight);
    font-size: var(--xv-title--title-lg--font-size);
    margin-bottom: 8px;
  }

  &-desc {
    color: #7c7c7c;
    font-weight: var(--xv-body--body-lg--font-weight);
    font-size: var(--xv-body--body-lg--font-size);
  }
}
</style>
