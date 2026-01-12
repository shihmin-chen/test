<template>
  <div style="display: inline-flex; flex-direction: column; gap: 0.5rem">
    <PrismCode>
      "\xui\src\components\XButton\demo\LoadingStateGuard.vue"
    </PrismCode>
    <span>Click event emit count: {{ count }}</span>
    <XButton :loading="loading" size="lg" @click="handleClick">
      Add One Count
    </XButton>
    <p>Click count should not increase when button is in loading state.</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import XButton from '../XButton.vue';
const loading = ref(false);

let timeout: number;
const count = ref(0);

const handleClick = () => {
  loading.value = true;
  count.value += 1;

  clearTimeout(timeout);

  timeout = window.setTimeout(() => {
    loading.value = false;
  }, 1000);
};
</script>
