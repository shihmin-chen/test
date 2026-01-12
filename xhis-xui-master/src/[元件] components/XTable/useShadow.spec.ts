import { nextTick, ref } from 'vue';
import useShadow from './useShadow';
import { XTableShadowOptions } from './XTableConfig';

const setProperties = (
  element: Element,
  properties: Record<string, number>
) => {
  Object.entries(properties).forEach(([key, value]) => {
    Object.defineProperty(element, key, { writable: true, value });
  });
};

describe('useShadow', () => {
  it('should show shadow based on scroll top', async () => {
    const target = document.createElement('div');
    setProperties(target, {
      scrollHeight: 500,
      clientHeight: 100,
      scrollWidth: 500,
      clientWidth: 100,
      scrollTop: 100,
    });

    const data = ref<Record<string, unknown>[]>([]);

    const {
      toggleShadow,
      topShadowHeight,
      topShadow,
      bottomShadow,
      isHorizontalScroll,
    } = useShadow({
      data,
      enableShadow: ref(true),
      targetRef: ref(target),
      tableHeaderRef: ref(),
      tableHeaderDefaultHeight: 40,
      shadowOptions: ref({ top: true, bottom: true }),
    });

    await nextTick();

    expect(topShadowHeight.value).toBe(40);
    expect(topShadow.value).toBe(true);
    expect(bottomShadow.value).toBe(true);
    expect(isHorizontalScroll.value).toBe(true);

    setProperties(target, { scrollTop: 0 });
    toggleShadow();

    await nextTick();
    expect(topShadow.value).toBe(false);
    expect(bottomShadow.value).toBe(true);

    setProperties(target, { scrollTop: 500 });
    toggleShadow();

    await nextTick();
    expect(topShadow.value).toBe(true);
    expect(bottomShadow.value).toBe(false);
  });

  it('should NOT show shadow when not providing target element', async () => {
    const target = undefined;
    const data = ref<Record<string, unknown>[]>([]);

    const { topShadow, bottomShadow, isHorizontalScroll } = useShadow({
      data,
      enableShadow: ref(true),
      targetRef: ref(target),
      tableHeaderRef: ref(),
      tableHeaderDefaultHeight: 40,
      shadowOptions: ref({ top: true, bottom: true }),
    });

    await nextTick();

    expect(topShadow.value).toBe(false);
    expect(bottomShadow.value).toBe(false);
    expect(isHorizontalScroll.value).toBe(false);
  });

  it('should NOT show shadow when prop `shadowOptions.top` or `shadowOptions.bottom` is `false`', async () => {
    const target = document.createElement('div');
    setProperties(target, {
      scrollHeight: 500,
      clientHeight: 100,
      scrollWidth: 500,
      clientWidth: 100,
      scrollTop: 100,
    });

    const data = ref<Record<string, unknown>[]>([]);

    const shadowOptions = ref<XTableShadowOptions>({ top: false });
    const { topShadow, bottomShadow, toggleShadow } = useShadow({
      data,
      enableShadow: ref(true),
      targetRef: ref(target),
      tableHeaderRef: ref(),
      tableHeaderDefaultHeight: 40,
      shadowOptions,
    });

    await nextTick();

    expect(topShadow.value).toBe(false);
    expect(bottomShadow.value).toBe(true);

    shadowOptions.value = { bottom: false };
    toggleShadow();
    expect(topShadow.value).toBe(true);
    expect(bottomShadow.value).toBe(false);
  });
});
