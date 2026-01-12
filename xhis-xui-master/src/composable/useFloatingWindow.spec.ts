import { useFloatingWindow } from './useFloatingWindow';

describe('useFloatingWindow', () => {
  const bounding = {
    top: 100,
    bottom: 500,
    left: 50,
    right: 450,
  };

  const options = {
    widthFactor: 0.7,
    heightOffset: 20,
    widthOffset: 10,
  };

  let innerHeightSpy: jest.SpyInstance;
  let innerWidthSpy: jest.SpyInstance;

  beforeEach(() => {
    globalThis.innerHeight = 1000;
    globalThis.innerWidth = 1000;
    innerHeightSpy = jest.replaceProperty(globalThis, 'innerHeight', 800);
    innerWidthSpy = jest.replaceProperty(globalThis, 'innerWidth', 1200);
  });

  afterEach(() => {
    innerHeightSpy.restore();
    innerWidthSpy.restore();
  });

  it('should calculate topPosition correctly', () => {
    const { topPosition } = useFloatingWindow(bounding, options);
    expect(topPosition.value).toBe(100);
  });

  it('should calculate leftPosition correctly', () => {
    const { leftPosition } = useFloatingWindow(bounding, options);
    expect(leftPosition.value).toBe(50); // bounding.left
  });

  it('should calculate heightSize correctly', () => {
    const { heightSize } = useFloatingWindow(bounding, options);
    expect(heightSize.value).toBe(780); // 800 - 20
  });

  it('should calculate widthSize correctly', () => {
    const { widthSize } = useFloatingWindow(bounding, options);
    expect(widthSize.value).toBe(840); // 1200 * 0.7
  });
});
