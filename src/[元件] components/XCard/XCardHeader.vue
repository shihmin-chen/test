<template>
  <header class="x-card-header" data-qa-xui="XCardHeader"><slot></slot></header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'XCardHeader',
});
</script>
