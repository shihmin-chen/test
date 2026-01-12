import {
  Ref,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  unref,
} from 'vue';
import { MaybeRef } from '@vueuse/core';
import { ModalType, modalStore } from '../useModalManagement';
import {
  ActionID,
  ConditionMap,
  FunctionKeyMap,
  KeyCombinationMap,
  KeyCompositionList,
  TextFieldKeyCombination,
} from '../../utils/constants/hotkeyConfig';

export type HotKey = {
  actionId: ActionID;
  disabled?: MaybeRef<boolean>;
  preventDefault?: boolean;
  handler: (keys: string[], e: KeyboardEvent) => void | Promise<void>;
};

const preventGlobalHotkeyInfo = new WeakMap<Element, string[][]>();

export const useHotkey = (
  modalId?: Ref<string>
): {
  setupHotkey: (hotkeys: HotKey[]) => void;
  preventGlobalHotkeyOnFocus: (
    activeElement: Element,
    hotkeysList: KeyboardEvent['key'][][]
  ) => void;
  registerByManual: (hotkeys: HotKey[]) => void;
  unregisterByManual: (hotkeys: HotKey[]) => void;
} => {
  const pressedKeys = new Map<string, boolean>();
  const registeredHotkeys: Record<string, HotKey[]> = {};

  // check if is composition mode ex: Chinese input
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event
  const isComposition = ref(false);

  const getKey = (key: string): string => {
    const stringKey: string | undefined = FunctionKeyMap[key];
    if (stringKey) {
      return stringKey;
    }
    return key;
  };

  const getKeyCombination = (keys: string[]): string => {
    const convertKeys = keys.map((key) => {
      return getKey(key);
    });
    return convertKeys.join(',').toLocaleLowerCase();
  };

  const addHotkey = (hotkey: HotKey): void => {
    if (!KeyCombinationMap[hotkey.actionId]) {
      return;
    }

    const keys = KeyCombinationMap[hotkey.actionId];
    const keyCombination = getKeyCombination([...keys]);

    if (!registeredHotkeys[keyCombination]) {
      registeredHotkeys[keyCombination] = [];
    }

    if (
      registeredHotkeys[keyCombination].find(
        (item) => item.actionId === hotkey.actionId
      )
    ) {
      return;
    }

    registeredHotkeys[keyCombination].push(hotkey);
  };

  const removeHotkey = (hotkey: HotKey): void => {
    const keys = KeyCombinationMap[hotkey.actionId];
    const keyCombination = getKeyCombination([...keys]);
    const index = registeredHotkeys[keyCombination]?.indexOf(hotkey) ?? -1;

    if (index !== -1) {
      registeredHotkeys[keyCombination].splice(index, 1);
    }
  };

  const checkIsNotTopModal = (): boolean => {
    const lastModalId = [...unref(modalStore).keys()][
      unref(modalStore).size - 1
    ];
    if (unref(modalId) && lastModalId && unref(modalId) !== lastModalId) {
      return true;
    }
    return false;
  };

  const checkModal = (hotkey: HotKey): boolean => {
    const { allow } = ConditionMap[hotkey.actionId];
    const dialogList = [...unref(modalStore)].filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_key, value]) => value === ModalType.dialog
    );
    const floatingWindowList = [...unref(modalStore)].filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_key, value]) => value === ModalType.floatingWindow
    );
    if (
      (!allow?.dialog && dialogList.length !== 0) ||
      (!allow?.floatingWindow && floatingWindowList.length !== 0)
    ) {
      return true;
    }
    return false;
  };

  const checkRouter = (hotkey: HotKey): boolean => {
    const { scopeRouter } = ConditionMap[hotkey.actionId];
    if (!scopeRouter) {
      return false;
    }
    const urlPathList = window.location.pathname.split('/');
    if (!urlPathList.some((path) => scopeRouter?.includes(path as any))) {
      return true;
    }
    return false;
  };

  const checkPreventField = (
    activeElement: Element,
    keyCombination: string
  ): boolean => {
    const targetHotkeys = preventGlobalHotkeyInfo.get(activeElement);
    if (targetHotkeys) {
      const targetKeyCombination = targetHotkeys.map((hotkey) =>
        getKeyCombination(hotkey)
      );
      if (targetKeyCombination.some((item) => item === keyCombination)) {
        return true;
      }
    }
    return false;
  };

  const checkTextField = (
    activeElement: Element,
    keyCombination: string
  ): boolean => {
    if (
      (activeElement instanceof HTMLInputElement &&
        activeElement.type === 'text') ||
      activeElement instanceof HTMLTextAreaElement
    ) {
      const transformKeyCombination = TextFieldKeyCombination.map((item) =>
        getKeyCombination(item)
      );
      if (transformKeyCombination.some((item) => item === keyCombination)) {
        return true;
      }
    }
    return false;
  };

  const checkInputType = (activeElement: Element): boolean => {
    return (
      activeElement instanceof HTMLInputElement &&
      activeElement.type === 'search'
    );
  };

  const getMatchedKeyCombination = (
    keyCombination: string,
    registeredHotkeys: Record<string, HotKey[]>
  ): string => {
    const userkeyCombinationSet = new Set(keyCombination.split(','));
    return Object.keys(registeredHotkeys).filter((keyConfig) => {
      const keyConfigSet = new Set(keyConfig.split(','));
      if (keyConfigSet.size !== userkeyCombinationSet.size) {
        return false;
      }
      for (const item of keyConfigSet) {
        if (!userkeyCombinationSet.has(item)) {
          return false;
        }
      }
      return true;
    })?.[0];
  };

  const onKeydown = (e: KeyboardEvent): void => {
    pressedKeys.set(e.code, e.repeat);
    const keyCombination = getKeyCombination(Array.from(pressedKeys.keys()));
    const activeElement = document.activeElement as Element;

    const matchedKeyCombination = getMatchedKeyCombination(
      keyCombination,
      registeredHotkeys
    );

    registeredHotkeys[matchedKeyCombination]?.forEach((hotkey) => {
      if (
        (unref(hotkey.disabled) ?? false) ||
        checkInputType(activeElement) ||
        checkTextField(activeElement, keyCombination) ||
        checkPreventField(activeElement, keyCombination) ||
        checkRouter(hotkey) ||
        checkModal(hotkey) ||
        checkIsNotTopModal()
      ) {
        return;
      }

      const keys = KeyCombinationMap[hotkey.actionId];
      if (!e.repeat) {
        if (
          KeyCompositionList.includes(getKey(e.code)) &&
          isComposition.value
        ) {
          return;
        }
        if (hotkey.preventDefault) {
          e.preventDefault();
        }
        e.stopImmediatePropagation(); // handle multiple modal situation
        hotkey.handler([...keys], e);
        pressedKeys.clear(); // prevent Windows key stuck
      }
    });
  };

  const onKeyup = (e: KeyboardEvent): void => {
    if (pressedKeys.has(e.code)) {
      pressedKeys.delete(e.code);
    }
  };

  const onCompositionstart = (): void => {
    isComposition.value = true;
  };

  const onCompositionend = (): void => {
    isComposition.value = false;
  };

  const register = (hotkeys: HotKey[]): void => {
    hotkeys.forEach((hotkey) => addHotkey(hotkey)); // register hotkey
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup', onKeyup);
    document.addEventListener('compositionstart', onCompositionstart);
    document.addEventListener('compositionend', onCompositionend);
  };

  const unregister = (hotkeys: HotKey[]): void => {
    hotkeys.forEach((hotkey) => removeHotkey(hotkey)); // unregister hotkey
    pressedKeys.clear(); // prevent abnormal unregister action from other widgets
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('keyup', onKeyup);
    document.removeEventListener('compositionstart', onCompositionstart);
    document.removeEventListener('compositionend', onCompositionend);
  };

  // should call when setup
  const setupHotkey = (hotkeys: HotKey[]): void => {
    onMounted(() => {
      register(hotkeys);
    });
    onActivated(() => {
      register(hotkeys);
    });

    onUnmounted(() => {
      unregister(hotkeys);
    });
    onDeactivated(() => {
      unregister(hotkeys);
    });
  };

  const preventGlobalHotkeyOnFocus = (
    activeElement: Element,
    hotkeysList: KeyboardEvent['key'][][]
  ): void => {
    preventGlobalHotkeyInfo.set(activeElement, hotkeysList);
  };

  const registerByManual = (hotkeys: HotKey[]): void => {
    register(hotkeys);
  };

  const unregisterByManual = (hotkeys: HotKey[]): void => {
    unregister(hotkeys);
  };

  return {
    setupHotkey,
    preventGlobalHotkeyOnFocus,
    registerByManual,
    unregisterByManual,
  };
};
