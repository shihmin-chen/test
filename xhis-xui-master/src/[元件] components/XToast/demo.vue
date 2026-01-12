<template>
  <div id="x-toast-demo">
    <XCheckbox v-model="isLabelContent" size="sm">With Label</XCheckbox>
    <div class="xd-row xd-space">
      <label>Auto Hide Delay:</label>
      <XInputText
        v-model="autoHideDelay"
        placeholder="In milliseconds"
        type="number"
        inline
      />
      <XCheckbox v-model="noAutoHide" size="sm">No Auto Hide</XCheckbox>
      <XCheckbox v-model="enableMaskedBackground" size="sm">
        Masked Background
      </XCheckbox>
    </div>
    <div class="xd-row xd-space">
      <label>Placement:</label>
      <XSelect
        v-model="toastPlacement"
        :data-options="placementOptions"
      />
    </div>
    <div class="xd-row xd-space x-toast-demo-buttons">
      <XButton
        :disabled="visible"
        @click="(visible = true), (theme = XToastTheme.Success)"
      >
        Show Success Toast
      </XButton>
      <XButton
        :disabled="visible"
        @click="(visible = true), (theme = XToastTheme.Neutral)"
      >
        Show Neutral Toast
      </XButton>
      <XButton
        :disabled="visible"
        @click="(visible = true), (theme = XToastTheme.Warning)"
      >
        Show Warning Toast
      </XButton>
      <XButton
        :disabled="visible"
        @click="(visible = true), (theme = XToastTheme.Error)"
      >
        Show Error Toast
      </XButton>
      <XButton
        :disabled="visible"
        @click="(visible = true), (theme = XToastTheme.Informational)"
      >
        Show Informational Toast
      </XButton>
    </div>
    <XToast
      v-model:visible="visible"
      content="Hello World!"
      :theme="theme"
      :label-content="isLabelContent ? 'Label' : ''"
      :no-auto-hide="noAutoHide"
      :auto-hide-delay="Number(autoHideDelay)"
      :enable-masked-background="enableMaskedBackground"
      :placement="toastPlacement"
    >
    </XToast>

    <hr class="xd-hr" />

    <div ref="toastTarget" class="x-toast-demo-target">
      Click the button to show the customized toast inside
      <XButton
        class="xd-row"
        :disabled="visibleOfCustomToast"
        @click="visibleOfCustomToast = true"
      >
        Show Toast
      </XButton>
      <div v-if="toastTarget">
        <XToast
          v-model:visible="visibleOfCustomToast"
          :is-label-content="isLabelContent ? true : false"
          :target="toastTarget"
          :custom-style="{
            justifyContent: isLabelContent ? 'space-between' : 'start',
            backgroundColor: '#f3c1c5',
            border: '1px solid #d93643',
          }"
          :enable-masked-background="enableMaskedBackground"
        >
          <template #content>
            <span style="color: #d93643">Hello World!</span>
          </template>
          <template #label-content>
            <span v-if="isLabelContent" style="color: #0074e6">Label</span>
          </template>
        </XToast>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import XToast from './XToast.vue';
import XButton from '../XButton/XButton.vue';
import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XInputText from '../XInput/XInputText.vue';
import XSelect from '../XSelect/XSelect.vue';
import { XToastTheme, XToastPlacement } from './enum';

const placementOptions = Object.values(XToastPlacement).map(
  (placement) => ({
    label: placement,
    value: placement,
  })
);

export default defineComponent({
  name: 'XToastDemo',
  tabName: 'XToast',
  components: { XButton, XCheckbox, XInputText, XToast, XSelect },
  setup() {
    const toastTarget = ref(null);
    const visible = ref(false);
    const visibleOfCustomToast = ref(false);
    const noAutoHide = ref(false);
    const autoHideDelay = ref('2000');
    const enableMaskedBackground = ref(false);
    const isLabelContent = ref(false);
    const theme = ref(XToastTheme.Neutral);
    const toastPlacement = ref(XToastPlacement.Middle);
    const hideToast = () => {
      visible.value = false;
    };
    watch(noAutoHide, hideToast);
    watch(autoHideDelay, hideToast);
    watch(toastPlacement, hideToast);

    return {
      XToastTheme,
      toastTarget,
      visible,
      visibleOfCustomToast,
      noAutoHide,
      autoHideDelay,
      placementOptions,
      toastPlacement,
      enableMaskedBackground,
      isLabelContent,
      theme,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-toast-demo-buttons {
  flex-wrap: wrap;
}
.x-toast-demo-target {
  position: relative;
  width: 450px;
  height: 250px;
  padding: 1rem;
  border-radius: 1rem;
  background: var(--xv-container--background);
}
</style>
