<template>
  <div>
    <h3>Shadow</h3>
    <div class="xd-block">
      <div
        v-for="name in [
          'x-shadow',
          'x-shadow--s',
          'x-shadow--m',
          'x-shadow--l',
          'x-shadow--xl',
          'x-shadow--tooltip',
          'x-shadow--dialog',
        ]"
        :key="name"
        class="shadow-block"
        :class="{
          [name]: true,
        }"
      >
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Shadow',
  setup() {
    return {};
  },
});
</script>

<style scoped>
.shadow-block {
  display: flex;
  align-items: center;
  width: fit-content;
  height: 30px;
  padding: 32px;
  color: #666;
  background-color: #fcfcfc;
  border-radius: 16px;
}
.xd-block {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}
</style>
