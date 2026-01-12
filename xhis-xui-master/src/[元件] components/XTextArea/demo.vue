<template>
  <div>
    <div class="options" style="margin-bottom: 1rem">
      <div class="xd-column">
        <XCheckbox v-model="readonly" size="sm">Readonly</XCheckbox>
        <XCheckbox v-model="error" size="sm">Error</XCheckbox>
      </div>
    </div>

    <div class="x-row xd-space">
      <div>
        <XTextArea
          v-model="text"
          placeholder="This is a Textarea"
          :readonly="readonly"
          :error="error"
        ></XTextArea>
      </div>
      <div>
        <XTextArea
          v-model="text"
          size="sm"
          inline
          :style="{ height: '171px', width: '512px' }"
        ></XTextArea>
      </div>
    </div>

    <pre class="text x-aria-tooltip" aria-label="Typed text">{{ text }}</pre>

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>modelValue: string (v-model)</dt>
      <dd>v-model</dd>
      <dt>rows: number = 3</dt>
      <dd>Takeover textarea's rows.</dd>
      <dt>readonly: boolean = false</dt>
      <dd>readonly mode</dd>
      <dt>error: boolean</dt>
      <dd>Indicate whether any error</dd>

      <h4>Emit</h4>
      <dt>update:modelValue: string</dt>
      <dd>string emit</dd>
    </dl>

    <h4>Note</h4>
    <p>Auto expand feature need to be implemented if needed.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import XTextArea from './XTextArea.vue';
import XCheckbox from '../XCheckbox/XCheckbox.vue';

export default defineComponent({
  name: 'XTextAreaDemo',
  tabName: 'XTextArea',
  components: { XTextArea, XCheckbox },
  setup() {
    return {
      text: ref(''),
      readonly: ref(false),
      error: ref(false),
    };
  },
});
</script>

<style lang="scss" scoped>
.text {
  background-color: #eee;
  padding: 16px;
}

.notice {
  display: flex;
  align-items: center;
  background-color: var(--xv-neutral--800);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  color: var(--xv-neutral--100);
}
</style>
