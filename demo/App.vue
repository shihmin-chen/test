<template>
  <DemoHeader></DemoHeader>
  <DemoSidebar
    :list="modules"
    :index="demoEntry"
    @update="(idx) => (demoEntry = idx)"
  />
  <div class="x-demo">
    <div class="xd-content x-scroll-bar">
      <template v-if="modules[demoEntry]?.default">
        <header class="xd-demo-content-header">
          <h2 class="xd-h2">{{ currentTabName }}</h2>
          <span class="xd-demo-content-header-path">{{ demoEntry }}</span>
        </header>

        <!-- Dynamic switch demo component -->
        <component :is="modules[demoEntry]?.default" />

        <template v-if="isDev">
          <!-- Source code dev preview -->
          <hr class="xd-hr" />
          <XCheckbox v-model="showDemoCode">
            Show demo file source code
          </XCheckbox>
          <pre v-if="showDemoCode" class="x-code-block">{{ demoCode }}</pre>
        </template>
      </template>
      <div v-else><Readme /></div>
    </div>
  </div>
  <img
    class="xd-powerby"
    src="@xui-assets/img/powerby.svg"
    alt="powered by AICS"
  />
</template>

<script lang="ts">
import { useTitle, useUrlSearchParams } from '@vueuse/core';
import {
  computed,
  defineComponent,
  onMounted,
  Ref,
  ref,
  unref,
  watch,
} from 'vue';

import Readme from '../README.md';
import XCheckbox from '../src/components/XCheckbox/XCheckbox.vue';
import DemoHeader from './internal/DemoHeader.vue';
import DemoSidebar from './internal/DemoSidebar.vue';

// Due to glob parsing limitation, only two layer of directory will be found
const modules: Record<string, { default: { tabName?: string } }> =
  import.meta.glob('../src/**/{d,D}emo.{vue,md}', {
    eager: true,
  });

const findTabName = (name: string) => {
  if (name) {
    for (let entry of Object.keys(modules)) {
      if (modules[entry]?.default?.tabName === name) {
        return entry;
      }
    }
  }
};

const useTabUrl = (demoEntry: Ref<string>) => {
  const params = useUrlSearchParams();

  const currentTabName = computed(
    () => modules[demoEntry.value]?.default?.tabName,
  );

  useTitle(computed(() => `xHIS UI - ${unref(currentTabName) ?? 'xHIS'}`));

  onMounted(() => {
    demoEntry.value = findTabName(params.tab as string) || '';
  });

  watch(currentTabName, (name) => {
    if (name) {
      params.tab = name;
    }
  });

  return {
    currentTabName,
  };
};

const useDemoCodePeek = (demoEntry: Ref<string>) => {
  const isDev = __XUI_IS_DEV__;
  const showDemoCode = ref(false);

  const demoCode = ref(
    isDev ? 'Source Code is only available in development mode' : '',
  );

  if (isDev) {
    watch([demoEntry, showDemoCode], async ([path, show]) => {
      if (show && path) {
        try {
          demoCode.value = (
            await import(/* @vite-ignore */ `${path}?raw`)
          ).default;
        } catch {
          demoCode.value = '';
        }
      } else {
        demoCode.value = '';
      }
    });
  }

  return {
    demoCode,
    showDemoCode,
    isDev,
  };
};

export default defineComponent({
  components: { DemoHeader, DemoSidebar, Readme, XCheckbox },
  setup() {
    const demoEntry = ref('');
    const { demoCode, showDemoCode, isDev } = useDemoCodePeek(demoEntry);
    const { currentTabName } = useTabUrl(demoEntry);

    return {
      modules,
      demoEntry,
      demoCode,
      currentTabName,
      showDemoCode,
      isDev,
    };
  },
});
</script>

<style lang="scss" src="./demoStyle/demo.scss"></style>
<style src="tippy.js/dist/tippy.css"></style>
<style src="tippy.js/dist/svg-arrow.css"></style>
<style src="modern-normalize/modern-normalize.css"></style>
<style lang="scss" src="../src/class/utils.scss"></style>
<style lang="scss" src="../src/class/global.scss"></style>
