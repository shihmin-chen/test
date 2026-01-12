<template>
  <div>
    <p>
      Typography css variable and css name. We export both variable version and
      class version at the same time. Variable version need to concat the style
      after the css name.
    </p>
    <p>
      Variable version eg.
      <PrismCode lang="css">
        .my-class{ font-size: var(--xv-headline--headline-lg--font-size) }
      </PrismCode>
    </p>
    <p>
      Class version eg.
      <PrismCode lang="html" :code="classVersionCodeSample" />
    </p>
    <dl class="xd-desc">
      <h4>Available CSS Variable</h4>
      <dt>--font-size</dt>
      <dd>font-size export</dd>
      <dt>--font-weight</dt>
      <dd>font-weight export</dd>
      <dt>--font-style</dt>
      <dd>Should not be used, it only contain italic face</dd>
      <dt>--line-height</dt>
      <dd>Line height</dd>
    </dl>
    <h3>Available Css Name</h3>
    <p>
      注意！後方有繁中的請直接忽略，使用不帶繁中字樣的 CSS 即可，兩個是一樣的。
    </p>
    <div v-for="map in typoMap" :key="map.name" class="typo-chunk">
      <div class="typo-chunk-name">{{ map.name }}</div>
      <div class="typo-chunk-css">
        Css Name: <code class="xd-code">{{ map.cssName }}</code>
      </div>
      <div class="typo-chunk-display" :class="{ [map.cssName]: true }">
        {{ demoText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import typoMap from './_figma/typoMap.data';
const demoText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Pellentesque semper malesuada condimentum.
0123456789

同子實頭型不積經引民有上自用人一竟？
輕區快北，官元動情發手實識我動正所。`;

export default defineComponent({
  name: 'TypographyDemo',
  tabName: 'Typography',
  setup() {
    return {
      typoMap,
      demoText,
      classVersionCodeSample: '<div class="xv-headline--headline-lg"></div>',
    };
  },
});
</script>

<style lang="scss" scoped>
.typo-chunk {
  margin: 0.5rem 0;
  &-name {
    font-size: larger;
    color: var(--xv-status--primary);
  }

  &-css {
    margin-top: 0.25rem;
    color: #444;
  }

  &-display {
    margin: 0.5rem 0;
    padding: 2rem;
    color: #666;
    border: solid 1px #ccc;
    white-space: pre-wrap;
  }
}
</style>
