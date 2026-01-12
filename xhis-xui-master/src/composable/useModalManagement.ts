import { MaybeRef, unrefElement, useActiveElement } from '@vueuse/core';
import { nanoid } from 'nanoid';
import { computed, onBeforeUnmount, onDeactivated, Ref, ref, watch } from 'vue';

export enum ModalType {
  dialog = 'dialog',
  floatingWindow = 'floatingWindow',
}
export const modalStore = ref(new Map<string, ModalType>());
export const activeElement = useActiveElement();

const add = (id: string, type: ModalType): void => {
  modalStore.value.set(id, type);
};

const remove = (id: string): void => {
  modalStore.value.delete(id);
};

export const useDialogManagement = (show: Ref<boolean>) => {
  const id = ref(nanoid());

  const addDialogStore = () => add(id.value, ModalType.dialog);

  const removeDialogStore = () => remove(id.value);

  watch(
    show,
    () => {
      if (show.value) {
        addDialogStore();
      } else {
        removeDialogStore();
      }
    },
    { immediate: true },
  );

  onBeforeUnmount(removeDialogStore);

  onDeactivated(removeDialogStore);

  return {
    modalStore,
    id,
  };
};

export const useFloatingWindowManagement = (show: Ref<boolean>) => {
  const id = ref(nanoid());

  const addFloatingWindowStore = () => add(id.value, ModalType.floatingWindow);

  const removeFloatingWindowStore = () => remove(id.value);

  watch(
    show,
    () => {
      if (show.value) {
        addFloatingWindowStore();
      } else {
        removeFloatingWindowStore();
      }
    },
    { immediate: true },
  );

  onBeforeUnmount(removeFloatingWindowStore);

  onDeactivated(removeFloatingWindowStore);

  return {
    modalStore,
    id,
  };
};

export const useModalHotkeyDisabled = (
  show: Ref<boolean>,
  disableEnter: Ref<boolean>,
  disableEsc: Ref<boolean>,
) => {
  const enterDisabled = computed(() => {
    return (
      !show.value ||
      disableEnter.value ||
      activeElement.value instanceof HTMLTextAreaElement
    );
  });
  const escDisabled = computed(() => {
    return !show.value || disableEsc.value;
  });

  return { enterDisabled, escDisabled };
};

export const handleModalHandler = (
  e: KeyboardEvent,
  modalElement: MaybeRef<HTMLElement | undefined>,
  handler: () => void,
): void => {
  e.preventDefault();
  e.stopPropagation();
  if (e.target === unrefElement(modalElement)) {
    handler();
  }
};
