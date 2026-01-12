<template>
  <div>
    <h3>Special filter set to change any element color</h3>
    <div class="xd-block">
      <div class="x-flex xd-space">
        <XInputText v-model="targetColor" inline label="Target Color" />
        <input v-model="targetColor" class="color-picker" type="color" />
      </div>
      <div class="x-flex xd-space" style="margin-top: 0.5rem">
        <XButton @click="onCalc">Calc Filter</XButton>
        <XCheckbox v-model="turnBlack" size="sm">
          Turn into Black first
        </XCheckbox>
      </div>
      <template v-if="result">
        <div class="x-flex" style="gap: 2rem">
          <dl class="xd-desc">
            <h4>Filter</h4>
            <dt>Filter</dt>
            <dd>
              <code class="xd-code">{{ filter }}</code>
            </dd>
            <dt>Loss</dt>
            <dd>{{ result.loss.toString().slice(0, 5) }}</dd>
            <dt>Loss Criteria</dt>
            <dd>{{ result.lossMsg }}</dd>
          </dl>

          <div class="filter-demo">
            <div class="color-set">
              <span class="color-tag">target color</span>
              <div
                class="color-block"
                :style="{ background: targetColor }"
              ></div>
            </div>
            <div class="color-set">
              <span class="color-tag">filter color</span>
              <div
                class="color-block"
                :style="{
                  background: 'black',
                  filter: result.filter.split(':')[1].split(';')[0],
                }"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <Desc />
  </div>
</template>

<script lang="ts">
// @ts-check
import { computed, defineComponent, Ref, ref, unref, watch } from 'vue';
import { Color, hexToRgb, Solver } from './demo';
import XInputText from '../../components/XInput/XInputText.vue';
import XButton from '../../components/XButton/XButton.vue';
import Desc from './demo/desc.vue';
import XCheckbox from '../../components/XCheckbox/XCheckbox.vue';

const toBlackFilter = 'contrast(0) brightness(0)';

const useToBlack = (result: Ref<Record<string, unknown>>) => {
  const turnBlack = ref(false);
  const filter = computed(() => {
    const r = unref(result);
    if (unref(turnBlack)) {
      const [_, f] = (r?.filter as string).split(':');

      return `filter: ${toBlackFilter} ${f}`;
    }
    return r?.filter;
  });

  return {
    filter,
    turnBlack,
  };
};

export default defineComponent({
  tabName: 'Magic Color Filter',
  components: { XInputText, XButton, Desc, XCheckbox },
  setup() {
    const targetColor = ref('#418FDE');
    const result = ref();

    watch(targetColor, () => {
      result.value = null;
    });

    const onCalc = () => {
      const rgb = hexToRgb(unref(targetColor));
      if (rgb?.length !== 3) {
        return;
      }

      const color = new Color(rgb[0], rgb[1], rgb[2]);
      const solver = new Solver(color);
      const r = solver.solve();

      let lossMsg;
      if (r.loss < 1) {
        lossMsg = 'This is a perfect result.';
      } else if (r.loss < 5) {
        lossMsg = 'This is close enough.';
      } else if (r.loss < 15) {
        lossMsg = 'The color is somewhat off. Consider running it again.';
      } else {
        lossMsg = 'The color is extremely off. Run it again!';
      }

      result.value = {
        lossMsg,
        ...r,
      };
    };

    const { filter, turnBlack } = useToBlack(result);

    return {
      targetColor,
      result,
      onCalc,
      filter,
      turnBlack,
    };
  },
});
</script>

<style lang="scss" scoped>
.color-set {
  margin: auto 2rem;
  display: inline-flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 16px 0 #2223;
  border-radius: 16px;
}
.color-block {
  width: 80px;
  height: 80px;
}
.color-tag {
  margin-bottom: 1rem;
  font-weight: 600;
  color: #777;
}
.color-picker {
  --bd-c: #eee;
  display: inline-flex;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border-radius: 100px;
  box-shadow: 0 0 6px 0 #2224;
  cursor: pointer;

  &:hover {
    --bd-c: white;
  }

  &::after {
    content: '';
    position: absolute;
    display: block;
    border-radius: 100px;
    inset: 0;
    width: 100%;
    height: 100%;
    border: solid 6px;
    transition: border-color 0.1s;
    border-color: var(--bd-c);
  }
}

.filter-demo {
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  border: solid 1px #2222;
  margin: 1rem 0;
}
</style>
