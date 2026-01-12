import { render, fireEvent, screen } from '@testing-library/vue';
import { nextTick, ref } from 'vue';
import XNotification from './XNotification.vue';

describe('XNotification', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('test render a notification', () => {
    const { getByText } = render(XNotification, {
      props: {
        visible: true,
        title: 'hello world',
      },
    });
    expect(getByText('hello world')).toBeDefined();
  });

  it('test render a notification with close button', async () => {
    const { getByAltText, emitted } = render(XNotification, {
      props: {
        visible: true,
        title: 'hello world',
        hasCloseButton: true,
        noAutoHide: true,
      },
    });
    const closeButton = getByAltText('close');
    await fireEvent.click(closeButton);
    expect(emitted()['update:visible'][0]).toStrictEqual([false]);
  });

  it('test auto hide delay', async () => {
    const visible = ref(false);
    const { emitted } = render(XNotification, {
      props: {
        visible,
        title: 'hello world',
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
    render(XNotification, {
      props: {
        visible,
        title: 'hello world',
        noAutoHide: false,
      },
    });

    visible.value = true;
    await nextTick();
    expect(setTimeout).toBeCalled();
  });

  it('test click show more button', async () => {
    const visible = ref(false);
    render(XNotification, {
      props: {
        visible,
        title: 'hello world',
        content: 'hello world',
        showAllNumber: 3,
        noAutoHide: true,
      },
    });

    visible.value = true;
    await nextTick();
    await fireEvent.click(screen.getByText('查看更多'));
    await nextTick();
    expect(screen.getByText('查看更多')).toBeNull;
  });

  it('test click label', async () => {
    const { getByText, emitted } = render(XNotification, {
      props: {
        visible: true,
        title: 'hello world',
        hasCloseButton: true,
        noAutoHide: true,
        leftLabelName: 'left-label-name',
        rightLabelName: 'right-label-name',
      },
    });
    expect(emitted()['clickLeftLabel']).toBeUndefined();
    expect(emitted()['clickRightLabel']).toBeUndefined();

    await fireEvent.click(getByText('left-label-name'));
    expect(emitted()['clickLeftLabel'].length).toBe(1);

    await fireEvent.click(getByText('right-label-name'));
    expect(emitted()['clickRightLabel'].length).toBe(1);
  });
});
