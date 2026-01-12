import { useDebounceFn } from '@vueuse/core';
import { cloneDeep } from 'lodash';
import tippy, {
  Content as TippyContent,
  Instance as TippyInstance,
  Props as TippyProps,
} from 'tippy.js';
import {
  onBeforeUnmount,
  onUnmounted,
  ref,
  Ref,
  watch,
  onDeactivated,
} from 'vue';
import {
  BasicElementType,
  MaybeElementRef,
  MaybeRef,
  unrefElement,
} from '../unrefElement';
import { DefaultZIndex } from '../useDynamicZIndex';

export type MaybeTippyElementRef = MaybeRef<TippyContent | undefined>;

export type TippyComposableObject = {
  /** target trigger */
  target: Ref<BasicElementType>;
  /** popup content reference */
  content: MaybeTippyElementRef;
  /** underlying tippy instance */
  tippyInstance: Ref<TippyInstance<TippyProps> | null>;
  /** is tippy expanded or not */
  isTippyShown: Ref<boolean>;
  /** show tippy */
  showTippy: () => void;
  /** hide tippy */
  hideTippy: () => void;
};

const defaultTippyProps: Partial<TippyProps> = {
  placement: 'bottom',
};

export const MOUSE_OUT = 'mouseoutForTippy';
export const MOUSE_OVER = 'mouseoverForTippy';

/**
 * Use tippy for given target and content.
 *
 * Content can be ref value or plain text or dom ref
 * Target should be dom ref/element ref only
 * @param target the target to reference
 * @param content
 * The content, can be dom element, string, vue element, element ref, all available type is Ref compatible.
 * Tippy will automatically take over the element in all situation.
 * @param props Tippy options props
 * @see https://atomiks.github.io/tippyjs/
 *
 * @example
 * js:
 * ```js
 * const { target, content } = useTippy()
 * ```
 *
 * vue:
 * ```html
 * <div ref='target'>hover me</div>
 * <div ref='content'>I am a tooltip</div>
 * ```
 *
 * DOM:
 * ```js
 * target: HTMLElement,
 *
 * to showTippy:
 * target.dispatchEvent(
 *  new MouseEvent(useTippy.MOUSE_OVER, { bubbles: true })
 * );
 *
 * to hideTippy:
 * target.dispatchEvent(
 *  new MouseEvent(useTippy.MOUSE_OUT, { bubbles: true })
 * );
 * ```
 *
 */
const useTippy = (
  target?: MaybeElementRef,
  content?: MaybeTippyElementRef,
  props?: Partial<TippyProps>,
  {
    enableDomControl,
    debounceMsec,
  }: { enableDomControl: boolean; debounceMsec: number } = {
    enableDomControl: false,
    debounceMsec: 1,
  }
): TippyComposableObject => {
  const theTarget = ref(target);
  const theContent = ref(content);
  const tippyInstance: Ref<TippyInstance | null> = ref(null);
  const isTippyShown = ref(false);

  const clear = () => {
    if (tippyInstance.value?.destroy) {
      tippyInstance.value.destroy();
      tippyInstance.value = null;
    }
  };

  const showTippy = () => {
    tippyInstance.value?.show();
  };

  const hideTippy = () => {
    tippyInstance.value?.clearDelayTimeouts();
    tippyInstance.value?.hide();
  };

  const switchTippy = useDebounceFn((show: boolean) => {
    if (show) {
      showTippy();
    } else {
      hideTippy();
    }
  }, debounceMsec);

  const debounceHideTippy = () => switchTippy(false);
  const debounceShowTippy = () => switchTippy(true);

  const _addMouseEventListener = (el: HTMLElement) => {
    el.addEventListener(MOUSE_OUT, debounceHideTippy, {
      passive: true,
    });

    el.addEventListener(MOUSE_OVER, debounceShowTippy, {
      passive: true,
    });
  };

  const _removeMouseEventListener = (el: HTMLElement) => {
    if (el) {
      el.removeEventListener(MOUSE_OUT, debounceHideTippy);
      el.removeEventListener(MOUSE_OVER, debounceShowTippy);
    }
  };

  let localProps: Partial<TippyProps> | null = null;
  if (props) {
    localProps = cloneDeep(props);
  }

  const initTippy = (newEl: BasicElementType, oldEl: BasicElementType) => {
    clear();
    const el = unrefElement(theTarget) || newEl;
    if (newEl) {
      tippyInstance.value = tippy(el as HTMLElement, {
        content: unrefElement(theContent as MaybeElementRef),
        theme: 'xui',
        ...defaultTippyProps,
        zIndex: DefaultZIndex.Tooltip,
        ...localProps,
        onShow: (...args) => {
          isTippyShown.value = true;
          localProps?.onShow?.(...args);
        },
        onHide: (...args) => {
          isTippyShown.value = false;
          localProps?.onHide?.(...args);
        },
      });

      if (enableDomControl) {
        _removeMouseEventListener(oldEl as HTMLElement);
        _addMouseEventListener(el as HTMLElement);
      }
    }
  };

  const setContent = (aContent: MaybeTippyElementRef) => {
    // istanbul ignore else
    if (tippyInstance.value) {
      tippyInstance.value.setContent(
        unrefElement(aContent as MaybeElementRef) as Element
      );
    }
  };

  watch(theTarget, initTippy, {
    immediate: true,
  });

  watch(theContent, setContent);

  onBeforeUnmount(() => {
    const el = unrefElement(theTarget);
    if (el && enableDomControl) {
      _removeMouseEventListener(el as HTMLElement);
    }
  });

  onUnmounted(() => clear());

  onDeactivated(() => hideTippy());

  return {
    target: theTarget,
    content: theContent,
    tippyInstance,
    isTippyShown,
    showTippy,
    hideTippy,
  };
};

const disableTippyIfNeeded = (
  disabled: boolean,
  tippyInstance: TippyInstance
): void => {
  if (disabled) {
    tippyInstance.disable();
  }
};

const watchDisabledForTippy = (
  disabled: Ref<boolean>,
  tippyInstance: Ref<TippyInstance | null>
): void => {
  watch(disabled, () => {
    if (disabled.value) {
      tippyInstance.value?.disable();
    } else {
      tippyInstance.value?.enable();
    }
  });
};

export { useTippy, disableTippyIfNeeded, watchDisabledForTippy };
