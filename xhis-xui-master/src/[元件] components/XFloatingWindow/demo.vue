<template>
  <div>
    <h3>Top:</h3>
    <XInputText v-model="topText" type="number"></XInputText>
    <h3>Left:</h3>
    <XInputText v-model="leftText" type="number"></XInputText>
    <XButton class="demo-btn" @click="showWindow">
      Show Floating Window
    </XButton>
    <dl class="xd-desc">
      <h4>Prop</h4>
      <dt>appendTo: string (default: 'body')</dt>
      <dd>The html element that XFloatingWindow append to.</dd>
      <dt>show: boolean (default: false)</dt>
      <dd>The controller to show/hide XFloatingWindow.</dd>
      <dt>height: number (default: 300)</dt>
      <dd>The height of XFloatingWindow.</dd>
      <dt>width: number (default: 500)</dt>
      <dd>The width of XFloatingWindow.</dd>
      <dt>top: number (default: 0)</dt>
      <dd>The top position of XFloatingWindow.</dd>
      <dt>left: number (default: 0)</dt>
      <dd>The left position of XFloatingWindow.</dd>
    </dl>
    <XFloatingWindow :show="show" :top="top" :left="left">
      <div class="floating-window-container">
        <XButton class="x-button" @click="closeWindow">Close Window</XButton>
      </div>
    </XFloatingWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import XButton from '../XButton/XButton.vue';
import XFloatingWindow from './XFloatingWindow.vue';
import XInputText from '../XInput/XInputText.vue';

export default defineComponent({
  name: 'XFloatingWindowDemo',
  tabName: 'XFloatingWindow',
  components: { XFloatingWindow, XButton, XInputText },

  setup() {
    const show = ref(false);
    const top = ref(0);
    const left = ref(0);
    const topText = computed({
      get: () => top.value.toString(),
      set: (value) => (top.value = Number(value)),
    });
    const leftText = computed({
      get: () => left.value.toString(),
      set: (value) => (left.value = Number(value)),
    });
    const showWindow = () => {
      show.value = true;
    };

    const closeWindow = () => {
      show.value = false;
    };
    return {
      show,
      showWindow,
      closeWindow,
      topText,
      leftText,
      top,
      left,
    };
  },
});
</script>

<style scoped>
.demo-btn {
  margin: 1rem;
}
.floating-window-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 120px 0;
  border-radius: 12px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  background-color: var(--xv-blackandwhite--white);
}
</style>
