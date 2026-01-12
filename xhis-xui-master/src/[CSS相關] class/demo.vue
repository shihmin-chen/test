<template>
  <h3>Flex</h3>
  <section class="xd-block x-flex-center">
    <code class="xd-code">x-flex-center</code>
  </section>

  <Scrollbar />
  <Shadow />
  <LineClamp />
  <SimpleTooltip />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LineClamp from './demo/LineClamp.vue';
import Shadow from './demo/Shadow.vue';
import SimpleTooltip from './demo/SimpleTooltip.vue';
import Scrollbar from './demo/Scrollbar.vue';

export default defineComponent({
  name: 'UtilsClassDemo',
  tabName: 'UtilsClass',
  components: {
    LineClamp,
    Shadow,
    SimpleTooltip,
    Scrollbar,
  },
});
</script>
