<template>
  <div>
    <dl class="xd-desc">
      <h4>x color system</h4>
      <dt>getXColor: (string[]) =&gt; &grave;var(--xv-${parsedStr})&grave;</dt>
      <dd>
        generate css variable name based on given string list, your string
        should be separated by the group
        <p>
          usage:
          <code class="xd-code">
            style = { backgroundColor: getXColor([&apos;red&apos;,
            &apos;600&apos;]) }
          </code>
        </p>
      </dd>
    </dl>
    <ColorVarDemo></ColorVarDemo>
    <div class="xd-block">
      <h3><XTag theme="green" outline>NEW</XTag> X Color Figma mapping</h3>
      <template v-for="(group, gpName) in mapping" :key="gpName">
        <h4 class="group-name">{{ gpName }}</h4>
        <div class="color-group">
          <div
            v-for="colors in group"
            :key="colors.join('|')"
            class="color-set"
          >
            <XTooltip
              :content="getXColor(colors)"
              :options="{ interactive: true }"
            >
              <div class="color-block-container">
                <div
                  class="color-block"
                  :style="{ backgroundColor: getXColor(colors) }"
                ></div>
              </div>
            </XTooltip>
            <span class="color-name">
              {{ colors.slice(1).join('-') }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getXColor } from '..';
import XTooltip from '../../components/XTooltip/XTooltip.vue';
import color from './_figma/color.data';
import XTag from '../../components/XTag/XTag.vue';
import ColorVarDemo from './demo/ColorVarDemo.vue';

export default defineComponent({
  tabName: 'Color System',
  components: { XTooltip, XTag, ColorVarDemo },
  setup() {
    const mapping: Record<string, string[][]> = {};
    color.forEach((list) => {
      if (!mapping[list[0]]) {
        mapping[list[0]] = [];
      }
      mapping[list[0]].push(list);
    });

    return {
      getXColor,
      mapping,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-name {
  color: #333;
  text-transform: capitalize;
}
.color-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  text-align: center;
}

.color-set {
  flex-shrink: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.color-block-container {
  background: linear-gradient(
    to bottom right,
    white 0,
    white 50%,
    black 50%,
    black
  );
  border-radius: 8px;
  outline: solid 2px #ddd;
}
.color-block {
  $size: 3rem;
  display: block;
  width: $size;
  height: $size;
  border-radius: 7px;
}

.color-name {
  color: #666;
  font-size: small;
}
</style>
