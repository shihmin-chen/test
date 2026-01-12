<template>
  <div v-if="!isNil(computedTitle)" class="flex flex-row">
    <div>
      {{ computedTitle }}
    </div>
    <RequiredAsterisk v-if="computedIsRequired" />
  </div>
</template>
<script lang="ts">
import { isNil } from 'lodash';
import { PropType, computed, defineComponent, unref } from 'vue';

import RequiredAsterisk from './RequiredAsterisk.vue';
import { MaybeRefOrComputed } from '../type';

export default defineComponent({
  name: 'TitleWithRequiredStar',
  components: {
    RequiredAsterisk,
  },
  props: {
    title: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: undefined,
    },
    isRequired: {
      type: Boolean as PropType<MaybeRefOrComputed<boolean>>,
      required: false,
      default: false,
    },
  },

  setup(props) {
    const computedTitle = computed(() => unref(props.title));
    const computedIsRequired = computed(() => unref(props.isRequired));

    return {
      computedIsRequired,
      computedTitle,
      isNil,
    };
  },
});
</script>
