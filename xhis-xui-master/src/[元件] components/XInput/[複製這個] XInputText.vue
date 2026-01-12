<template>
  <label
    ref="root"
    data-qa-xui="XInput"
    class="x-input"
    :class="{
      'x-input--fill': fill,
      'x-input--borderless': borderless,
      'x-input--readonly': readonly,
      [`x-input--${size}`]: true,
    }"
    :data-x-input-type="type"
  >
    <span v-if="label" class="x-input-label">
      {{ label }}
      <span v-if="required" class="x-input-label-required-mark">*</span>
    </span>
    <div
      class="x-input-text-container"
      :class="{
        'x-input-text-container--inline': inline,
        'x-input-text-container--error': error,
        'x-input-text-container--disabled': disabled,
        'x-input-text-container--readonly': readonly,
        'x-input-text-container--showSelectedResults': showSelectedResults,
      }"
      :style="inputStyle"
    >
      <slot name="prefix">
        <template v-if="type === 'search'">
          <XIcon
            icon="search"
            :color="
              disabled
                ? 'var(--xv-text--disabled-text)'
                : 'var(--xv-text--medium-emphasis-text)'
            "
          />
        </template>
      </slot>
      <div
        v-for="(selectedResult, selectedIndex) in selectedResults"
        :key="selectedIndex"
        class="x-input-text-container--tag"
        @mousedown.prevent
      >
        <div class="x-input-text-container--tag-text">
          {{ selectedResult }}
        </div>
        <XIcon
          icon="error-filled"
          color="#5B5B5B"
          class="x-input-text-container--tag-icon"
          @click="emit('deleteSelectedIndex', selectedIndex)"
        />
      </div>
      <input
        ref="inputRef"
        :value="modelValue"
        :placeholder="placeholder"
        class="x-input-input"
        :type="displayType"
        v-bind="{
          disabled,
          readonly,
          required,
          ...inputAttrs,
        }"
        @input="inputHandler"
        @blur="blurHandler"
        @focus="focusHandler"
      />
      <slot name="postfix"></slot>
      <XIconButton
        v-if="type === 'password'"
        size="sm"
        class="x-aria-tooltip x-input-icon-button"
        :aria-label="pwVis ? '隱藏' : '顯示'"
        aria-description="toggle password visibility"
        v-bind="{ disabled }"
        tabindex="-1"
        @click.stop.prevent="pwVis = !pwVis"
      >
        <XIcon v-show="pwVis" icon="eye-show" />
        <XIcon v-show="!pwVis" icon="eye-hide" />
      </XIconButton>
    </div>
    <div
      v-if="showMessage"
      class="x-input-msg"
      :class="{
        'x-input-msg--error': error,
      }"
    >
      <XIcon v-if="error" :icon="errorIcon" class="x-input-msg-icon" />
      <span class="x-input-msg-text">{{ message }}</span>
    </div>
  </label>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  unref,
} from 'vue';
import { isEmpty } from 'lodash';
import { XIconButton } from '../XIconButton';
import { XIcon } from '../XIcon';

export const availableTypes = [
  'text',
  'password',
  'search',
  'url',
  'email',
  'number',
] as const;
export type AvailableType = typeof availableTypes[number];

export default defineComponent({
  name: 'XInputText',
  components: {
    XIconButton,
    XIcon,
  },
  props: {
    modelValue: {
      type: [Number, String],
      default: '',
    },
    type: {
      default: 'text',
      type: String as PropType<AvailableType>,
    },
    size: {
      default: 'md',
      type: String as PropType<'sm' | 'md'>,
    },
    inline: {
      default: false,
      type: Boolean,
    },
    borderless: {
      default: false,
      type: Boolean,
    },
    defaultVisibility: {
      default: false,
      type: Boolean,
    },
    inputAttrs: {
      default: () => ({}),
      type: Object,
    },
    inputStyle: {
      default: () => ({}),
      type: [Object, String],
    },
    label: {
      default: '',
      type: String,
    },
    placeholder: {
      default: null,
      type: String,
    },
    error: {
      default: false,
      type: Boolean,
    },
    errorIcon: {
      default: 'alert-filled',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    readonly: {
      default: false,
      type: Boolean,
    },
    required: {
      default: false,
      type: Boolean,
    },
    fill: {
      default: false,
      type: Boolean,
    },
    autofocus: {
      default: false,
      type: Boolean,
    },
    selectText: {
      default: false,
      type: Boolean,
    },
    message: {
      default: '',
      type: String,
    },
    showSelectedResults: {
      default: false,
      type: Boolean,
    },
    selectedResults: {
      default: () => [],
      type: Array,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_value: string) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    inputBlur: (_element: HTMLInputElement) => true,
    inputFocus: (_element: HTMLInputElement) => true,
    deleteSelectedIndex: (_value: number) => true,
  },
  setup(props, { emit }) {
    const pwVis = ref(unref(props.defaultVisibility));
    const inputRef = ref<HTMLInputElement>();

    const root = ref<Element | null>(null);

    const displayType: ComputedRef<AvailableType> = computed(() => {
      if (props.type === 'password') {
        return unref(pwVis) ? 'text' : 'password';
      }
      return props.type;
    });

    const inputHandler = (event: Event) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    };

    const focusTime = ref(0);

    const blurHandler = () => {
      if (inputRef.value) {
        emit('inputBlur', inputRef.value);
      }
    };

    const focusHandler = () => {
      if (inputRef.value) {
        focusTime.value = Date.now();
        emit('inputFocus', inputRef.value);
      }
    };

    const showMessage = computed(() => {
      return !isEmpty(props.message);
    });

    onMounted(() => {
      nextTick(() => {
        if (props.autofocus) {
          inputRef.value?.focus();
        }
        if (props.selectText) {
          inputRef.value?.select();
          inputRef.value?.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
        }
      });
    });

    return {
      pwVis,
      displayType,
      inputRef,
      inputHandler,
      blurHandler,
      focusHandler,
      showMessage,
      emit,
      root,
    };
  },
});
</script>

<style lang="scss">
.x-input {
  --x-input-primary: var(--xv-status--primary--rgb);
  --x-input-bg: var(--xv-container--surface);
  --x-input-message: var(--xv-text--medium-emphasis-text);
  --x-input-bd-color: var(--xv-text--dividing-line);
  --x-input-bd: solid 1px var(--x-input-bd-color);
  --x-input-bd-radius: 8px;
  --x-input-height: 40px;
  --x-input-text-margin: 8px;
  font-size: var(--xv-body--body-lg--font-size);
  font-weight: var(--xv-body--body-lg--font-weight);
  line-height: var(--xv-body--body-lg--line-height);

  &--sm {
    --x-input-height: 32px;
    --x-input-bd-radius: 6px;
    --x-input-text-margin: 4px;
    font-size: var(--xv-body--body-md--font-size);
    font-weight: var(--xv-body--body-md--font-weight);
    line-height: var(--xv-body--body-md--line-height);
  }

  min-width: 0;

  &:hover:not(&--readonly) {
    --x-input-bd-color: var(--xv-text--placeholder-text);
  }

  &--fill {
    --x-input-bg: var(--xv-container--area);
    --x-input-bd-color: transparent;
    .x-input-text-container--error {
      --x-input-bg: var(--xv-red--50);
    }
    .x-input-input::placeholder {
      color: var(--xv-text--low-emphasis-text);
    }
  }

  &--borderless {
    --x-input-bd-color: transparent;
  }

  &-label {
    color: var(--xv-text--medium-emphasis-text);
    display: inline-flex;
    margin-right: var(--x-input-text-margin);
    margin-bottom: var(--x-input-text-margin);
    &-required-mark {
      margin-left: 2px;
      color: var(--xv-status--error);
    }
  }

  &-input {
    min-width: 0;
    outline: none;
    border: none;
    border-radius: var(--x-input-bd-radius);
    flex: 1;
    height: 100%;
    padding: 0 8px;
    background: transparent;
    caret-color: rgb(var(--x-input-primary));

    &::placeholder {
      color: var(--xv-text--placeholder-text);
    }

    &:placeholder-shown {
      text-overflow: ellipsis;
    }

    &::selection {
      background-color: rgb(var(--xv-primary--200--rgb), 0.64);
    }

    &[type='number'] {
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &[type='search'] {
      &::-webkit-search-cancel-button {
        -webkit-appearance: none !important;
        height: 18px;
        width: 18px;
        margin-inline-start: 4px;
        margin-right: -4px;
        background-image: url('@xui-assets/icon/clear-text.svg');
        cursor: pointer;
      }
      &:placeholder-shown {
        &::-webkit-search-cancel-button {
          display: none;
        }
      }
    }
  }

  &[data-x-input-type='search']:focus-within {
    --x-input-bg: var(--xv-container--surface);
  }
}

.x-input-text-container {
  height: var(--x-input-height);
  padding: 0 var(--x-input-text-margin);
  display: flex;
  border-radius: var(--x-input-bd-radius);
  border: var(--x-input-bd);
  background: var(--x-input-bg);
  flex-direction: row;
  align-items: center;
  cursor: text;

  transition: box-shadow 0.1s, border-color 0.1s;

  &--inline {
    display: inline-flex;
  }

  &--error {
    --x-input-primary: var(--xv-status--error--rgb);
    border-color: rgb(var(--x-input-primary));
  }

  &:focus-within {
    box-shadow: 0 0 0 2px var(--xv-container--surface-pressed);
    &:not(.x-input-text-container--readonly) {
      box-shadow: 0 0 1px 2px rgba(var(--x-input-primary), 0.2);
      border-color: rgb(var(--x-input-primary));
    }
  }

  &--disabled {
    border-color: transparent;
    background-color: var(--xv-container--disabled-background);
    .x-input-input,
    .x-input-input::placeholder {
      color: var(--xv-text--disabled-text);
    }
  }

  &--showSelectedResults {
    flex-wrap: wrap;
    height: auto;
    padding: 6px 16px;
    row-gap: 6px;
    column-gap: 4px;
  }

  &--tag {
    padding: 4px 8px;
    background: #c7eaed;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    &-text {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #262626;
    }

    &-icon {
      width: 20px;
      height: 20px;
      opacity: 0.5;
      margin-left: 8px;
      cursor: pointer;
    }
  }
}

.x-input-icon-button {
  --x-icon-btn-color: var(--xv-text--dividing-line);
}

.x-input-msg {
  display: flex;
  align-items: center;
  margin-top: 4px;
  color: var(--x-input-message);
  &-icon {
    margin-left: -4px;
    height: 16px;
  }
  &-text {
    line-height: 1.5;
    font-size: 16px;
  }
  &--error {
    --x-input-message: var(--xv-status--error);
  }
}
</style>
