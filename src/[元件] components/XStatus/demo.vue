<template>
  <div class="d xd-block">
    <div v-for="[name, type] in types" :key="name" class="status-block">
      <div class="desc">
        <span>
          type: <code class="xd-code">{{ name }}</code>
        </span>
        <PrismCode
          lang="json"
          block
          :code="JSON.stringify(type || '', undefined, 2)"
        />
      </div>
      <XStatus :type="name"></XStatus>
    </div>
  </div>

  <div class="xd-desc">
    <h4>Props</h4>
    <dl>
      <dt>type: string as keyof typeof XStatusTypes</dt>
      <dd>Pre-config type with message</dd>
    </dl>

    <h4>slots</h4>
    <dl>
      <dt>default</dt>
      <dd>Title slot</dd>
      <dt>description</dt>
      <dd>description slot</dd>
      <dt>figure</dt>
      <dd>image slot</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { XStatusType, xStatusTypes } from './index';
import { XStatus, XStatusDefinedTypes } from './index';

const types = Object.entries(xStatusTypes) as [
  XStatusDefinedTypes,
  XStatusType,
][];

export default defineComponent({
  tabName: 'XStatus',
  components: {
    XStatus,
  },
  setup() {
    return {
      types,
    };
  },
});
</script>

<style lang="scss" scoped>
.d {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.status-block {
  display: flex;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 0 16px 0 #2222;
}

.desc {
  display: flex;
  flex-direction: column;
  border-right: solid 1px #2222;
  padding-right: 1rem;
}
</style>
