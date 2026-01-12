import { Ref, ref } from 'vue';
import type {
  Instance as TippyInstance,
  Content as TippyContent,
  Props as TippyProps,
} from 'tippy.js';
import { flushPromises } from '@vue/test-utils';
import { useSetup } from '../../../testUtils/mount';
import * as unrefElement from '../../../composable/unrefElement';
import { useTippyBounding } from './useTippyBounding';

describe('Test useTippyBounding', () => {
  // setup: mock
  const mockSetProps = jest.fn();
  const mockUnrefElement = jest.spyOn(unrefElement, 'unrefElement');

  beforeEach(() => {
    mockUnrefElement.mockImplementation((elRef: any) => elRef.value);
  });

  afterEach(() => {
    // teardown: mock
    jest.clearAllMocks();
  });

  it('Test bindTippyProps - with modifiers', async () => {
    // setup: props
    const tippyInstance = ref<TippyInstance<TippyProps> | null>(null);
    const tippyContent = ref();

    // exercise: mount
    useSetup(() => {
      useTippyBounding(tippyInstance, tippyContent);
    });

    // exercise: update tippy instance
    tippyInstance.value = {
      props: {
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            {
              name: 'fake_name',
            },
          ],
        },
      },
      setProps: mockSetProps,
    } as unknown as TippyInstance<TippyProps>;
    await flushPromises();

    // verify: should disabled flip and preventOverflow
    expect(mockSetProps).toBeCalledWith({
      popperOptions: {
        modifiers: [
          {
            name: 'fake_name',
          },
          expect.objectContaining({
            name: 'flip',
            enabled: false,
            options: expect.anything(),
          }),
          {
            name: 'preventOverflow',
            enabled: false,
            options: expect.anything(),
          },
        ],
      },
    });
  });

  it('Test bindTippyProps - without modifiers', async () => {
    // setup: props
    const tippyInstance = ref<TippyInstance<TippyProps> | null>(null);
    const tippyContent = ref();

    // exercise: mount
    useSetup(() => {
      useTippyBounding(tippyInstance, tippyContent);
    });

    // exercise: update tippy instance
    tippyInstance.value = {
      props: {
        placement: 'left',
        popperOptions: {},
      },
      setProps: mockSetProps,
    } as unknown as TippyInstance<TippyProps>;
    await flushPromises();

    // verify: should disabled flip and preventOverflow
    expect(mockSetProps).toBeCalledWith({
      popperOptions: {
        modifiers: [
          expect.objectContaining({
            name: 'flip',
            enabled: true,
            options: expect.anything(),
          }),
          {
            name: 'preventOverflow',
            enabled: true,
            options: expect.anything(),
          },
        ],
      },
    });
  });

  it('Test bindTippyProps - null', async () => {
    // setup: props
    const tippyInstance = ref<TippyInstance<TippyProps> | null>(null);
    const tippyContent = ref();

    // exercise: mount
    useSetup(() => {
      useTippyBounding(tippyInstance, tippyContent);
    });

    // exercise: update tippy instance
    tippyInstance.value = {
      props: {
        placement: 'bottom',
        popperOptions: {},
      },
      setProps: mockSetProps,
    } as unknown as TippyInstance<TippyProps>;
    await flushPromises();

    // teardown: reset called count
    mockSetProps.mockClear();

    // exercise: update tippy instance
    tippyInstance.value = null;
    await flushPromises();

    // verify: should not call set props if tippy instance is null
    expect(mockSetProps).toBeCalledTimes(0);
  });

  it('Test updateTippyBounding, tippyStyle - top, number viewportPadding', async () => {
    /**
     * case:
     * - window size: (0, 0) to (800, 600)
     * - tippy content range: (40, 30) to (60, 70)
     * - viewport padding: 15
     * - result
     *   - top max height: 70 - 15 = 55
     */

    // setup: props
    const tippyInstance = ref({
      props: {
        placement: 'bottom',
      },
    }) as Ref<TippyInstance>;
    const tippyContent = ref({
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 30,
        bottom: 70,
      }),
    } as unknown as TippyContent);

    // exercise: mount
    const vm = useSetup(() => {
      window.innerHeight = 600;
      const { updateTippyBounding, tippyStyle } = useTippyBounding(
        tippyInstance,
        tippyContent,
        {
          viewportPadding: 15,
        }
      );
      return { updateTippyBounding, tippyStyle };
    });

    // exercise: update bounding
    await vm.updateTippyBounding();

    // verify: should get expected style
    expect(vm.tippyStyle).toStrictEqual({
      maxHeight: '55px',
    });
  });

  it('Test updateTippyBounding, tippyStyle - bottom, object viewportPadding, resize', async () => {
    /**
     * case:
     * - window size: (0, 0) to (800, 600)
     * - tippy content range: (600, 450) to (700, 500)
     * - viewport padding: 15
     * - result
     *   - bottom max height: 600 - 450 - 10 = 140
     */

    // setup: props
    const tippyInstance = ref({
      props: {
        placement: 'bottom',
      },
    }) as Ref<TippyInstance>;
    const tippyContent = ref({
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 450,
        bottom: 500,
      }),
    } as unknown as TippyContent);

    // exercise: mount
    const vm = useSetup(() => {
      window.innerHeight = 600;
      const { updateTippyBounding, tippyStyle } = useTippyBounding(
        tippyInstance,
        tippyContent,
        {
          viewportPadding: {
            bottom: 10,
          },
        }
      );
      return { updateTippyBounding, tippyStyle };
    });

    // exercise: update bounding
    window.dispatchEvent(new Event('resize'));
    await flushPromises();

    // verify: should get expected style
    expect(vm.tippyStyle).toStrictEqual({
      maxHeight: '140px',
    });
  });

  it('Test updateTippyBounding, tippyStyle - not vertical expand', async () => {
    // setup: props
    const tippyInstance = ref({
      props: {
        placement: 'right',
      },
    }) as Ref<TippyInstance>;
    const tippyContent = ref({
      getBoundingClientRect: jest.fn(),
    } as unknown as TippyContent);

    // exercise: mount
    const vm = useSetup(() => {
      window.innerHeight = 600;
      const { updateTippyBounding, tippyStyle } = useTippyBounding(
        tippyInstance,
        tippyContent,
        {
          viewportPadding: 200,
          maxViewportHeight: 0.5,
        }
      );
      return { updateTippyBounding, tippyStyle };
    });

    // exercise: update bounding
    await vm.updateTippyBounding();

    // verify: should get max container height
    expect(vm.tippyStyle).toStrictEqual({
      maxHeight: '200px', // min(600*0.5, 600-200*2)
    });

    // exercise: update bounding
    window.innerHeight = 1200;
    window.dispatchEvent(new Event('resize'));
    await flushPromises();

    // verify: should get max viewport height
    expect(vm.tippyStyle).toStrictEqual({
      maxHeight: '600px', // min(1200*0.5, 1200-200*2)
    });
  });

  it('Test updateTippyBounding, tippyStyle - undefined tippyContent', async () => {
    // setup: props
    const tippyInstance = ref(null);
    const tippyContent = ref();

    // exercise: mount
    const vm = useSetup(() => {
      const { updateTippyBounding, tippyStyle } = useTippyBounding(
        tippyInstance,
        tippyContent
      );
      return { updateTippyBounding, tippyStyle };
    });

    // exercise:
    await vm.updateTippyBounding();

    // verify: should get empty style
    expect(vm.tippyStyle).toStrictEqual({});
  });
});
