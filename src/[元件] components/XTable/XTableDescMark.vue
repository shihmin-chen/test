<template>
  <img
    :src="questionMark"
    class="x-table-th--question"
    :title="desc"
    :alt="desc"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import questionMark from '@xui-assets/icon/question.svg?url';

export default defineComponent({
  name: 'XTableDescMark',
  props: {
    desc: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      questionMark,
    };
  },
});
</script>
