<template>
  <h3>Scrollbar</h3>
  <section class="xd-block x-scroll-bar overscroll-container">
    <div class="overscroll">
      <code class="xd-code">x-scroll-bar</code>
      <p>
        remember to set <code class="xd-code">overflow</code> in css as well
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Scrollbar',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.overscroll {
  height: 600px;
  background: linear-gradient(
    to bottom,
    rgb(245, 230, 246),
    rgb(241, 223, 223)
  );
  border-radius: 1rem;
  padding: 1rem;
  > code {
    position: sticky;
    top: 1rem;
    left: 1rem;
  }
}
.overscroll-container {
  height: 240px;
  overflow: auto;
}
</style>
