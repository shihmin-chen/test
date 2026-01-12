import XTooltip from './XTooltip.vue';
import { render, screen, fireEvent } from '@testing-library/vue';
import { nextTick, ref, unref } from 'vue';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('XTooltip', () => {
  it('should show tooltip', async () => {
    const text = ref('hello world');

    render(XTooltip, {
      props: {
        content: text,
      },
      slots: {
        default: 'here',
      },
    });

    await nextTick();
    await fireEvent.mouseEnter(screen.getByText('here'));
    await sleep(250);

    expect(screen.getByText(unref(text))).toBeDefined();

    text.value = 'show this instead';
    await nextTick();
    expect(unref(text)).toBe('show this instead');

    expect(screen.getByText(unref(text))).toBeDefined();
  });

  it('should show tooltip when ellipsis', async () => {
    const text = ref('hello world');

    render(XTooltip, {
      props: {
        content: text,
        ellipsis: true,
      },
      slots: {
        default: 'here',
      },
    });

    await nextTick();
    const target = screen.getByText('here');
    jest.spyOn(target, 'clientWidth', 'get').mockImplementation(() => 300);
    jest.spyOn(target, 'scrollWidth', 'get').mockImplementation(() => 200);
    await fireEvent.mouseOver(target);
    await fireEvent.mouseEnter(target);

    expect(screen.queryByText(unref(text))).toBeFalsy();

    await nextTick();
    jest.spyOn(target, 'clientWidth', 'get').mockImplementation(() => 100);
    await fireEvent.mouseOver(target);
    await fireEvent.mouseEnter(target);

    expect(screen.queryByText(unref(text))).toBeTruthy();

    jest.restoreAllMocks();
  });

  it('should show tooltip when ellipsis with ellipsisOnEventTarget = true', async () => {
    const text = ref('hello world');

    render(XTooltip, {
      props: {
        content: text,
        ellipsis: true,
        ellipsisOnEventTarget: true,
      },
      slots: {
        default: 'here',
      },
    });

    await nextTick();
    const target = screen.getByText('here');
    jest.spyOn(target, 'clientWidth', 'get').mockImplementation(() => 300);
    jest.spyOn(target, 'scrollWidth', 'get').mockImplementation(() => 200);
    await fireEvent.mouseOver(target);
    await fireEvent.mouseEnter(target);

    expect(screen.queryByText(unref(text))).toBeFalsy();

    await nextTick();
    jest.spyOn(target, 'clientWidth', 'get').mockImplementation(() => 100);
    await fireEvent.mouseOver(target);
    await fireEvent.mouseEnter(target);

    expect(screen.queryByText(unref(text))).toBeTruthy();

    jest.restoreAllMocks();
  });
});
