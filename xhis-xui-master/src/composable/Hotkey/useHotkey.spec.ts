import { KeepAlive, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useHotkey } from './useHotkey';
import { ActionID } from '../../utils/constants/hotkeyConfig';
import { fireEvent, render } from '@testing-library/vue';
import { modalStore, useDialogManagement } from '../useModalManagement';
import { flushPromises, mount } from '@vue/test-utils';

jest.mock('../../utils/constants/hotkeyConfig', () =>
  jest.requireActual('../../utils/constants/mockHotkeyConfig.data')
);

describe('useHotkey', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Test normal hotkey', async () => {
    // mock
    const disabled = ref(true);
    const mockHandler = jest.fn();

    // setup
    const { container, unmount } = render({
      template: '<div></div>',
      setup() {
        const { setupHotkey } = useHotkey();
        setupHotkey([
          {
            actionId: ActionID.normalTest,
            disabled: disabled,
            handler: mockHandler,
          },
        ]);
      },
    });

    // verify
    expect(mockHandler).toBeCalledTimes(0);

    // exercise
    await fireEvent.keyDown(container, { code: 'ControlLeft' });
    await fireEvent.keyDown(container, { code: 'KeyA' });

    // verify
    expect(mockHandler).toBeCalledTimes(0);

    // exercise
    await fireEvent.keyUp(container, { code: 'ControlLeft' });
    await fireEvent.keyUp(container, { code: 'KeyA' });

    // verify

    disabled.value = false;

    // exercise
    await fireEvent.keyDown(container, { code: 'ControlLeft' });
    await fireEvent.keyDown(container, { code: 'KeyA' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    unmount();
  });

  it('Test order hotkey', async () => {
    // setup: mock
    const mockHandler = jest.fn();

    // setup: mount
    const { container, unmount } = render({
      template: '<div></div>',
      setup() {
        const { setupHotkey } = useHotkey();
        setupHotkey([
          {
            actionId: ActionID.orderTest,
            handler: mockHandler,
          },
        ]);
      },
    });

    // verify
    expect(mockHandler).toBeCalledTimes(0);

    // exercise
    await fireEvent.keyDown(container, { code: 'ControlLeft' });
    await fireEvent.keyDown(container, { code: 'F1' });
    await fireEvent.keyDown(container, { code: 'KeyA' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    unmount();
  });

  it('Test text field hotkey', async () => {
    // setup: mock
    const mockHandler = jest.fn();

    // setup: mount
    const { container, getByTestId, unmount } = render({
      template: '<input data-testid="input" type="text" />',
      setup() {
        const { setupHotkey } = useHotkey();
        setupHotkey([
          {
            actionId: ActionID.textFieldTest,
            handler: mockHandler,
          },
        ]);
      },
    });

    // verify
    expect(mockHandler).toBeCalledTimes(0);

    // exercise
    await fireEvent.keyDown(container, { code: 'ControlLeft' });
    await fireEvent.keyDown(container, { code: 'KeyC' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    const input = getByTestId('input');
    input.focus();

    // exercise
    await fireEvent.keyDown(container, { code: 'ControlLeft' });
    await fireEvent.keyDown(container, { code: 'KeyC' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    unmount();
  });

  it('Test input type hotkey', async () => {
    // setup: mock
    const mockHandler = jest.fn();

    // setup: mount
    const { container, getByTestId, unmount } = render({
      template: '<input data-testid="input" type="search" />',
      setup() {
        const { setupHotkey } = useHotkey();
        setupHotkey([
          {
            actionId: ActionID.inputTypeTest,
            handler: mockHandler,
          },
        ]);
      },
    });

    // verify
    expect(mockHandler).toBeCalledTimes(0);

    // exercise
    await fireEvent.keyDown(container, { code: 'ControlLeft' });
    await fireEvent.keyDown(container, { code: 'KeyB' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    const input = getByTestId('input');
    input.focus();

    // exercise
    await fireEvent.keyDown(container, { code: 'ControlLeft' });
    await fireEvent.keyDown(container, { code: 'KeyB' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    unmount();
  });

  it('Test custom prevent field hotkey', async () => {
    // setup: mock
    const mockHandler = jest.fn();

    // setup: mount
    const { container, getByTestId, unmount } = render({
      template: '<div ref="preventDiv" data-testid="preventDiv"></div>',
      setup() {
        const preventDiv = ref();
        const { preventGlobalHotkeyOnFocus, setupHotkey } = useHotkey();

        setupHotkey([
          {
            actionId: ActionID.preventFieldTest,
            handler: mockHandler,
          },
        ]);

        onMounted(() => {
          preventGlobalHotkeyOnFocus(preventDiv.value, [['F3']]);
        });

        return { preventDiv };
      },
    });

    // verify
    expect(mockHandler).toBeCalledTimes(0);

    // exercise
    await fireEvent.keyDown(container, { code: 'F3' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    // exercise
    await fireEvent.keyUp(container, { code: 'F3' });

    const preventDiv = getByTestId('preventDiv');

    Object.defineProperty(document, 'activeElement', {
      value: preventDiv,
    });

    // exercise
    await fireEvent.keyDown(container, { code: 'F3' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    unmount();
  });

  it('Test router hotkey', async () => {
    // setup: mock
    const mockHandler = jest.fn();

    // setup: mount
    const { container, unmount } = render({
      template: '<div></div>',
      setup() {
        const { setupHotkey } = useHotkey();
        setupHotkey([
          {
            actionId: ActionID.routerTest,
            handler: mockHandler,
          },
        ]);
      },
    });

    // verify
    expect(mockHandler).toBeCalledTimes(0);

    // exercise
    await fireEvent.keyDown(container, { code: 'F2' });

    // verify
    expect(mockHandler).toBeCalledTimes(0);

    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/fakeURL',
      },
    });

    // exercise
    await fireEvent.keyDown(container, { code: 'F2' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    unmount();
  });

  it('Test modal hotkey', async () => {
    // setup: mock
    const mockHandler = jest.fn();
    const show = ref(false);
    const f4 = new KeyboardEvent('keydown', { code: 'F4' });

    // setup: mount
    const wrapper = mount({
      template: '<div></div>',
      setup() {
        const { setupHotkey } = useHotkey();
        setupHotkey([
          {
            actionId: ActionID.modalTest,
            handler: mockHandler,
          },
        ]);
      },
    });
    useDialogManagement(show);

    // verify
    expect(mockHandler).toBeCalledTimes(0);

    // exercise
    (document.activeElement as HTMLElement)?.blur?.();
    document.dispatchEvent(f4);

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    // exercise
    show.value = true;
    await wrapper.vm.$nextTick();
    (document.activeElement as HTMLElement)?.blur?.();
    document.dispatchEvent(f4);

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    show.value = false;
    wrapper.unmount();
  });

  it('Test close hotkey', async () => {
    // setup: mock
    const esc = new KeyboardEvent('keydown', { code: 'Escape' });
    const show1 = ref(true);
    const show2 = ref(true);

    // setup: mount
    mount({
      template: '<div></div>',
      setup() {
        const { id } = useDialogManagement(show1);
        const { setupHotkey } = useHotkey(ref(id));
        setupHotkey([
          {
            actionId: ActionID.closeTest,
            handler: () => {
              show1.value = false;
            },
          },
        ]);
      },
    });
    mount({
      template: '<div></div>',
      setup() {
        const { id } = useDialogManagement(show2);
        const { setupHotkey } = useHotkey(ref(id));
        setupHotkey([
          {
            actionId: ActionID.closeTest,
            handler: () => {
              show2.value = false;
            },
          },
        ]);
      },
    });

    // verify
    expect(modalStore.value.size).toBe(2);

    // exercise
    (document.activeElement as HTMLElement)?.blur?.();
    document.dispatchEvent(esc);

    await flushPromises();

    // verify
    expect(modalStore.value.size).toBe(1);

    // exercise
    (document.activeElement as HTMLElement)?.blur?.();
    document.dispatchEvent(esc);

    await flushPromises();

    // verify
    expect(modalStore.value.size).toBe(0);
  });

  it('Test auto register and manual register and should not register duplicate key', async () => {
    // mock
    const mockHandler = jest.fn();

    // setup
    const KeepAliveComponent = defineComponent({
      components: { KeepAlive },
      setup() {
        const { setupHotkey, registerByManual, unregisterByManual } =
          useHotkey();

        setupHotkey([
          {
            actionId: ActionID.normalTest,
            handler: mockHandler,
          },
        ]);

        onMounted(() => {
          registerByManual([
            {
              actionId: ActionID.normalTest,
              handler: mockHandler,
            },
          ]);
        });
        onUnmounted(() => {
          unregisterByManual([
            {
              actionId: ActionID.normalTest,
              handler: mockHandler,
            },
          ]);
        });
      },
      template: `
      <KeepAlive>
        <div>hotkey</div>
      </KeepAlive>`,
    });

    // mount
    const { container, unmount } = render(KeepAliveComponent);

    // verify
    expect(mockHandler).toBeCalledTimes(0);

    // exercise
    await fireEvent.keyDown(container, { code: 'ControlLeft' });
    await fireEvent.keyDown(container, { code: 'KeyA' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);

    // exercise
    unmount();

    // exercise
    await fireEvent.keyDown(container, { code: 'ControlLeft' });
    await fireEvent.keyDown(container, { code: 'KeyA' });

    // verify
    expect(mockHandler).toBeCalledTimes(1);
  });
});
