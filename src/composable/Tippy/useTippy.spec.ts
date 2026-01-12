import { fireEvent, render, screen } from '@testing-library/vue';
import { defineComponent, nextTick, ref, unref } from 'vue';
import { MOUSE_OUT, MOUSE_OVER, useTippy } from './useTippy';

describe('useTippy', () => {
  it('should use composition api', async () => {
    const text = ref('hello world');
    render(
      defineComponent({
        setup() {
          const { target } = useTippy(undefined, text, undefined, {
            enableDomControl: true,
            debounceMsec: 1,
          });
          return {
            target,
          };
        },
        template: '<div ref="target">hi</div>',
      })
    );

    await nextTick();
    await fireEvent.mouseEnter(screen.getByText('hi'));

    expect(screen.getByText(unref(text))).toBeDefined();

    text.value = 'show this instead';
    await nextTick();
    expect(unref(text)).toBe('show this instead');

    expect(screen.getByText(unref(text))).toBeDefined();

    screen.getByText('hi').dispatchEvent(new Event(MOUSE_OUT));
    await nextTick();
    screen.getByText('hi').dispatchEvent(new Event(MOUSE_OVER));
    await nextTick();
    screen.getByText('hi').dispatchEvent(new Event(MOUSE_OUT));
    await nextTick();
    screen.getByText('hi').dispatchEvent(new Event(MOUSE_OVER));
    await nextTick();
  });
});
