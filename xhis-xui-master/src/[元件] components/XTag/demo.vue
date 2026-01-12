<template>
  <div>
    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>theme: XColorTheme</dt>
      <dd>light mode:</dd>
      <dd class="x-flex xd-space x-demo-tag-sample-row">
        <XTag v-for="theme in themeList" :key="theme" :theme="theme">
          {{ theme }}
        </XTag>
      </dd>
      <dd>dark mode:</dd>
      <dd class="x-flex xd-space x-demo-tag-sample-row">
        <XTag v-for="theme in themeList" :key="theme" :theme="theme" dark>
          {{ theme }}
        </XTag>
      </dd>
      <dt>outline: boolean = false</dt>
      <dd>light mode:</dd>
      <dd class="x-flex xd-space x-demo-tag-sample-row">
        <XTag v-for="theme in themeList" :key="theme" :theme="theme" outline>
          {{ theme }}
        </XTag>
      </dd>
      <dd>dark mode:</dd>
      <dd class="x-flex xd-space x-demo-tag-sample-row">
        <XTag
          v-for="theme in themeList"
          :key="theme"
          :theme="theme"
          outline
          dark
        >
          {{ theme }}
        </XTag>
      </dd>
      <dt>dark: boolean = false</dt>
      <dd>display mode, ture is dark mode and false is light mode</dd>
      <dt>rounded: boolean</dt>
      <dd class="x-flex xd-space">
        <XTag rounded theme="teal">ICD-CODE</XTag>
        <XTag rounded outline>Padding x is slightly widder</XTag>
      </dd>
      <dd>light mode:</dd>
      <dd class="x-flex xd-space x-demo-tag-sample-row">
        <XTag v-for="theme in themeList" :key="theme" :theme="theme" rounded>
          {{ theme }}
        </XTag>
      </dd>
      <dd class="x-flex xd-space x-demo-tag-sample-row">
        <XTag
          v-for="theme in themeList"
          :key="theme"
          :theme="theme"
          rounded
          outline
        >
          {{ theme }}
        </XTag>
      </dd>
      <dd>dark mode:</dd>
      <dd class="x-flex xd-space x-demo-tag-sample-row">
        <XTag
          v-for="theme in themeList"
          :key="theme"
          :theme="theme"
          rounded
          dark
        >
          {{ theme }}
        </XTag>
      </dd>
      <dd class="x-flex xd-space x-demo-tag-sample-row">
        <XTag
          v-for="theme in themeList"
          :key="theme"
          :theme="theme"
          rounded
          dark
          outline
        >
          {{ theme }}
        </XTag>
      </dd>

      <h4>Slots</h4>
      <dt>default = {color, backgroundColor, border}</dt>
      <dd>content of tag, also provide corresponding color style</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { XColorThemeList } from '../../shared';
import XTag from './XTag.vue';

export default defineComponent({
  name: 'XTagDemo',
  tabName: 'XTag',
  components: { XTag },
  setup() {
    return {
      themeList: XColorThemeList,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-demo-tag-sample-row {
  margin-left: 1rem;
}
</style>
