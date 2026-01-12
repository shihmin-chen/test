import { useXDialogueStyle, XDialogueViewType } from './useXDialogueStyle';

describe('useXDialogueStyle', () => {
  it('should return the correct xDialogueStyle for "full-screen" view', () => {
    const view = XDialogueViewType.FullScreen;
    const { width, height, top, left, mask } = useXDialogueStyle(view);

    expect(width.value).toBe(window.innerWidth);
    expect(height.value).toBe(window.innerHeight);
    expect(top.value).toBe('0');
    expect(left.value).toBe('0');
    expect(mask.value).toBe(false);
  });

  it('should return the correct xDialogueStyle for "half-screen" view', () => {
    const view = XDialogueViewType.HalfScreen;
    const { width, height, top, left, mask } = useXDialogueStyle(view);

    expect(width.value).toBe(window.innerWidth * 0.5);
    expect(height.value).toBe(window.innerHeight * 0.84);
    expect(top.value).toBe('8%');
    expect(left.value).toBe('25%');
    expect(mask.value).toBe(true);
  });

  // Add more test cases for other views...

  it('should return the default xDialogueStyle for unknown view', () => {
    const view = 'unknown-view';
    const { width, height, top, left, mask } = useXDialogueStyle(view);

    expect(width.value).toBeUndefined();
    expect(height.value).toBeUndefined();
    expect(top.value).toBeUndefined();
    expect(left.value).toBeUndefined();
    expect(mask.value).toBeUndefined();
  });
  it('should return the correct xDialogueStyle for "view-list" view', () => {
    const view = XDialogueViewType.ViewList;
    const { width, maxWidth, height, maxHeight, top, left, mask } = useXDialogueStyle(view);

    expect(width.value).toBe(window.innerWidth * 0.93);
    expect(maxWidth.value).toBe(window.innerWidth - 120);
    expect(height.value).toBe(window.innerHeight * 0.87);
    expect(maxHeight.value).toBe(window.innerHeight - 108);
    expect(top.value).toBe('6%');
    expect(left.value).toBe('3.5%');
    expect(mask.value).toBe(true);
  });

  it('should return the correct xDialogueStyle for "view-wide-sm" view', () => {
    const view = XDialogueViewType.ViewWideSm;
    const { width, maxWidth, height, maxHeight, top, left, mask } = useXDialogueStyle(view);

    expect(width.value).toBe(window.innerWidth * 0.76);
    expect(maxWidth.value).toBe(window.innerWidth - 120);
    expect(height.value).toBe(window.innerHeight * 0.76);
    expect(maxHeight.value).toBe(window.innerHeight - 108);
    expect(top.value).toBe('12%');
    expect(left.value).toBe('12%');
    expect(mask.value).toBe(true);
  });

  it('should return the correct xDialogueStyle for "view-single" view', () => {
    const view = XDialogueViewType.ViewSingle;
    const { width, height, top, left, mask } = useXDialogueStyle(view);

    expect(width.value).toBe(window.innerWidth * 0.5);
    expect(height.value).toBe(window.innerHeight * 0.92);
    expect(top.value).toBe('6%');
    expect(left.value).toBe('48.75%');
    expect(mask.value).toBe(false);
  });

  it('should return the correct xDialogueStyle for "view-wide" view', () => {
    const view = XDialogueViewType.ViewWide;
    const { width, maxWidth, height, maxHeight, top, left, mask } = useXDialogueStyle(view);

    expect(width.value).toBe(window.innerWidth * 0.92);
    expect(maxWidth.value).toBe(window.innerWidth - 120);
    expect(height.value).toBe(window.innerHeight * 0.9);
    expect(maxHeight.value).toBe(window.innerHeight - 108);
    expect(top.value).toBe('6%');
    expect(left.value).toBe('4%');
    expect(mask.value).toBe(true);
  });

  it('should return the correct xDialogueStyle for "rwd-dialog" view', () => {
    const view = XDialogueViewType.RwdDialog;
    const { maxWidth, maxHeight, mask } = useXDialogueStyle(view);

    expect(maxWidth.value).toBe(window.innerWidth - 120);
    expect(maxHeight.value).toBe(window.innerHeight - 136);
    expect(mask.value).toBe(true);
  });

  it('should return the correct xDialogueStyle for "preference-setting" view', () => {
    const view = XDialogueViewType.PreferenceSetting;
    const { width, height, top, left, mask } = useXDialogueStyle(view);

    if (window.innerWidth < 1800) {
      expect(width.value).toBe(window.innerWidth * 0.64);
      expect(left.value).toBe('17.5%');
    } else {
      expect(width.value).toBe(window.innerWidth * 0.5);
      expect(left.value).toBe('24.5%');
    }
    expect(height.value).toBe(window.innerHeight * 0.78);
    expect(top.value).toBe('11%');
    expect(mask.value).toBe(true);
  });

  it('should return the correct xDialogueStyle for "fixed-height" view', () => {
    const view = XDialogueViewType.FixedHeight;
    const { width, height, mask } = useXDialogueStyle(view);

    if (window.innerWidth < 1560) {
      expect(width.value).toBe(window.innerWidth - 120);
    } else {
      expect(width.value).toBe(1440);
    }
    expect(height.value).toBe(670);
    expect(mask.value).toBe(true);
  });
});
