import { render } from '@testing-library/vue';
import { nextTick, ref } from 'vue';
import XToast from './XToast.vue';

describe('XToast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('test render a toast', () => {
    const { getByText } = render(XToast, {
      props: {
        visible: true,
        content: 'hello world',
      },
    });
    expect(getByText('hello world')).toBeDefined();
  });

  it('test auto hide delay', async () => {
    const visible = ref(false);
    const { emitted } = render(XToast, {
      props: {
        visible,
        content: 'hello world',
        noAutoHide: false,
      },
    });

    visible.value = true;
    await nextTick();
    jest.runAllTimers();
    expect(emitted()['update:visible'][0]).toStrictEqual([false]);
  });

  it('test watch visible with auto hide', async () => {
    const visible = ref(false);
    render(XToast, {
      props: {
        visible,
        content: 'hello world',
        noAutoHide: false,
      },
    });

    visible.value = true;
    await nextTick();
    expect(setTimeout).toBeCalled();
  });

  it('test watch visible without auto hide', async () => {
    const visible = ref(false);
    render(XToast, {
      props: {
        visible,
        content: 'hello world',
        noAutoHide: true,
      },
    });

    visible.value = true;
    await nextTick();
    expect(setTimeout).not.toBeCalled();
  });
});
