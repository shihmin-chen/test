<template>
  <div class="x-dialog-layout-icon">
    <div
      class="x-dialog-layout-icon-wrapper"
      :class="{
        [`x-dialog-layout-icon-wrapper--${theme}`]: true,
      }"
    >
      <XIcon v-if="iconAttrs" width="54px" height="54px" v-bind="iconAttrs" />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';

import { XIcon } from '../../components/XIcon';

import { XDialogLayoutTheme } from './enum';

export default defineComponent({
  name: 'XDialogLayoutIcon',
  components: {
    XIcon,
  },
  props: {
    /**
     * The theme of the icon
     */
    theme: {
      type: String as PropType<XDialogLayoutTheme>,
      required: true,
    },
  },
  setup(props) {
    const iconAttrs = computed(() => {
      let attrs: InstanceType<typeof XIcon>['$props'] | undefined;
      switch (props.theme) {
        case 'success':
          attrs = {
            icon: 'checkmark',
            color: 'var(--xv-green--400)',
          };
          break;
        case 'warning':
          attrs = {
            icon: 'warning-outline',
            color: 'var(--xv-orange--400)',
          };
          break;
        case 'danger':
          attrs = {
            icon: 'alert-outline',
            color: 'var(--xv-red--400)',
          };
          break;
        case 'error':
          attrs = {
            icon: 'error-outline',
            color: 'var(--xv-red--400)',
          };
          break;
        default:
          break;
      }
      return attrs;
    });

    return {
      iconAttrs,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-dialog-layout-icon {
  &-wrapper {
    width: 72px;
    height: 72px;
    padding: 9px;
    border-radius: 50px;

    &--success {
      background-color: var(--xv-green--50);
    }

    &--warning {
      padding: 7px 9px 11px; // since the icon has some offset, set the different padding by the design in figma
      background-color: var(--xv-orange--50);
    }

    &--danger {
      background-color: var(--xv-red--50);
    }

    &--error {
      background-color: var(--xv-red--50);
    }
  }
}
</style>
