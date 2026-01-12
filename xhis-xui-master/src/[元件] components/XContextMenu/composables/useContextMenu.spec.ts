import { ref } from 'vue';


import { useContextMenu } from './useContextMenu';
import * as useTippy from '../../../composable/Tippy/useTippy';

describe('useContextMenu', () => {
  // setup: data
  const defaultDisabled = false;
  const defaultTippyOptions = {};

  // setup: mock
  const mockTippyInstance = {
    setProps: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
  };

  beforeEach(() => {
    // setup: mock
    document.createElement = jest.fn(); // 避免 "TypeError: P5 is not a function" 的錯誤
    jest.spyOn(useTippy, 'useTippy').mockReturnValue({
      content: ref(),
      tippyInstance: mockTippyInstance,
    } as unknown as any);
  });

  afterEach(() => {
    // teardown: reset called
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown: mock
    jest.restoreAllMocks();
  });

  it('Test handleContextMenu', async () => {
    // setup: use composable
    const { handleContextMenu } = useContextMenu(
      defaultDisabled,
      defaultTippyOptions,
    );

    // exercise: call target function
    const mockPreventDefault = jest.fn();
    const mouseEvent = {
      preventDefault: mockPreventDefault,
      clientX: 0,
      clientY: 0,
    } as unknown as MouseEvent;
    handleContextMenu(mouseEvent);

    // verify: should prevent default mouse event and show tippy
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(mockTippyInstance.show).toHaveBeenCalledTimes(1);
  });

  it('Test handleContextMenu - disabled', async () => {
    // setup: use composable
    const { handleContextMenu } = useContextMenu(
      true, // case: disabled
      defaultTippyOptions,
    );

    // exercise: call target function
    const mouseEvent = {
      preventDefault: jest.fn(),
      clientX: 0,
      clientY: 0,
    } as unknown as MouseEvent;
    handleContextMenu(mouseEvent);

    // verify: should not show tippy if disabled
    expect(mockTippyInstance.show).toHaveBeenCalledTimes(0);
  });

  it('Test hideContextMenu', async () => {
    // setup: use composable
    const { hideContextMenu } = useContextMenu(
      defaultDisabled,
      defaultTippyOptions,
    );

    // exercise: call target function
    hideContextMenu();

    // verify: should hide tippy
    expect(mockTippyInstance.hide).toHaveBeenCalledTimes(1);
  });
});
