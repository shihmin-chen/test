import { ref, nextTick } from 'vue';
import { useSetup } from '../testUtils/mount';
import {
  modalStore,
  useDialogManagement,
  useFloatingWindowManagement,
  useModalHotkeyDisabled,
} from './useModalManagement';

describe('useModalManagement', () => {
  it('Test dialog of useModalManagement', async () => {
    // setup
    const show = ref(true);

    // verify
    expect(modalStore.value.size).toBe(0);

    // exercise
    useSetup(() => {
      useDialogManagement(show);
    });

    // verify
    expect(modalStore.value.size).toBe(1);

    // exercise
    show.value = false;
    await nextTick();

    // verify
    expect(modalStore.value.size).toBe(0);
  });

  it('Test floatingWindow of useModalManagement', async () => {
    // setup
    const show = ref(true);

    // verify
    expect(modalStore.value.size).toBe(0);

    // exercise
    useSetup(() => {
      useFloatingWindowManagement(show);
    });

    // verify
    expect(modalStore.value.size).toBe(1);

    // exercise
    show.value = false;
    await nextTick();

    // verify
    expect(modalStore.value.size).toBe(0);
  });

  it('Test useModalHotkeyDisabled', () => {
    // setup
    const show = ref(true);
    const disableEnter = ref(false);
    const disableEsc = ref(false);

    const { enterDisabled, escDisabled } = useModalHotkeyDisabled(
      show,
      disableEnter,
      disableEsc
    );

    // verify
    expect(enterDisabled.value).toBe(false);
    expect(escDisabled.value).toBe(false);

    // exercise
    disableEnter.value = true;

    // verify
    expect(enterDisabled.value).toBe(true);
    expect(escDisabled.value).toBe(false);

    // exercise
    disableEsc.value = true;

    // verify
    expect(enterDisabled.value).toBe(true);
    expect(escDisabled.value).toBe(true);

    // exercise
    disableEnter.value = false;
    disableEsc.value = false;
    show.value = false;

    // verify
    expect(enterDisabled.value).toBe(true);
    expect(escDisabled.value).toBe(true);
  });
});
