<template>
  <div data-testid="x-table-sort-arrow" className="x-table-sort-arrow">
    <XIcon
      width="16"
      height="16"
      :color="isSorted ? '#0074E6' : '#7C7C7C'"
      :icon="isSorted && reversed ? 'arrow-up' : 'arrow-down'"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { XIcon } from '../XIcon';

export default defineComponent({
  name: 'XTableSortArrow',
  components: { XIcon },
  props: {
    isSorted: {
      default: false,
      type: Boolean,
    },
    reversed: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
<style>
.x-table-sort-arrow {
  margin-left: 4px;
  display: inline-flex;
}
</style>
