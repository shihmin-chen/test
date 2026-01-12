<template>
  <div class="x-demo-table-small-block">
    <XTable ref="tableRef" :data="data" :options="options"></XTable>
  </div>
</template>

<script lang="ts" setup>
import { defineExpose, ref } from 'vue';
import { XTable } from '..';
import { XTableEntryOption } from '../XTableConfig';

const tableRef = ref<InstanceType<typeof XTable> | null>(null);
defineExpose({
  scrollToRowStart: (row: string) => tableRef.value?.scrollToRow(row),
  scrollToRowCenter: (row: string) =>
    tableRef.value?.scrollToRow(row, { position: 'center' }),
});
const data = [...Array(10).keys()].map((idx) => ({
  idx,
  hello: 'super long hello world ' + idx,
  foo: 'even longer foo ' + idx,
  bar: 'bar is long, long' + idx,
  that: 'that one is longer ' + idx,
}));
const options: XTableEntryOption[] = [
  {
    index: 'idx',
    cellClass: 'x-demo-table-nowrap x-demo-table-first',
    headClass: 'x-demo-table-first',
    headStyle: {
      // Need to elevate this to cover "body" cells
      zIndex: '2',
    },
    title: 'Fixed header',
  },
  {
    index: 'bar',
    cellClass: 'x-demo-table-nowrap',
  },
  {
    index: 'foo',
    cellClass: 'x-demo-table-nowrap',
  },
  {
    index: 'hello',
    cellClass: 'x-demo-table-nowrap',
  },
  {
    index: 'that',
    cellClass: 'x-demo-table-nowrap',
  },
];
</script>

<style lang="scss">
.x-demo-table-small-block {
  width: 600px;
  height: 300px;
}
.x-demo-table-nowrap {
  white-space: nowrap;
}

.x-demo-table-first {
  // Use sticky to make sure no performance issue
  position: sticky;
  // if more then one col, you will need to add fixed width for it
  left: 0;
  // Provide bg color to cover other cells
  background-color: aliceblue;
  border-color: #ddd;
  border-right: solid 1px #ddd;
  // elevate the z index to prevent any rendering context covering issue
  z-index: 1;
}
</style>
