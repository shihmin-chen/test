import { useCopyToClipboard } from './useCopyToClipboard';

describe('useCopyToClipboard', () => {
  let originalClipboard: typeof navigator.clipboard;

  beforeAll(() => {
    originalClipboard = { ...navigator.clipboard };
    // Mock the clipboard object
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined)
      }
    });
  });

  afterAll(() => {
    navigator.clipboard = originalClipboard;
  });

  it('should copy selected text to clipboard', async () => {
    const { runCopyToClipboard } = useCopyToClipboard();
    const selectedText = 'Hello, World!';
    const alternativeText = 'Alternative Text';

    navigator.clipboard.writeText = jest.fn().mockResolvedValueOnce(undefined);

    const result = await runCopyToClipboard(selectedText, alternativeText);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(selectedText);
    expect(result).toBe(true);
  });

  it('should copy alternative text to clipboard if selected text is empty', async () => {
    const { runCopyToClipboard } = useCopyToClipboard();
    const selectedText = '';
    const alternativeText = 'Alternative Text';

    navigator.clipboard.writeText = jest.fn().mockResolvedValueOnce(undefined);

    const result = await runCopyToClipboard(selectedText, alternativeText);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(alternativeText);
    expect(result).toBe(true);
  });

  it('should return false if copying to clipboard fails', async () => {
    const { runCopyToClipboard } = useCopyToClipboard();
    const selectedText = 'Hello, World!';
    const alternativeText = 'Alternative Text';

    navigator.clipboard.writeText = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to copy'));

    const result = await runCopyToClipboard(selectedText, alternativeText);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(selectedText);
    expect(result).toBe(false);
  });

  it('should have the correct copy label', () => {
    const { copyLabel } = useCopyToClipboard();
    expect(copyLabel).toBe('複製(Ctrl+C)');
  });
});
