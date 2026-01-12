
/**
 * A composable function that provides functionality to copy text to the clipboard.
 *
 * This function returns an object containing a label for the copy action and a method
 * to execute the copy operation. The method can handle both selected text and an
 * alternative text, copying the alternative text if the selected text is empty.
 *
 * @returns An object with the following properties:
 * - `copyLabel`: A string label for the copy action, currently set to '複製(Ctrl+C)'.
 * - `runCopyToClipboard`: An asynchronous function that takes two parameters:
 *   - `selectedText`: The text that is currently selected and intended to be copied.
 *   - `alternativeText`: The text that will be copied if the `selectedText` is empty.
 *   The function attempts to copy the appropriate text to the clipboard and returns
 *   `true` if successful, or `false` if an error occurs during the copy operation.
 */
export function useCopyToClipboard() {
  const copyLabel = '複製(Ctrl+C)';
  const runCopyToClipboard = async (
    selectedText: string,
    alternativeText: string,
  ) => {
    // copy the alternative text to clipboard if selected text is empty
    // otherwise, copy the selected text
    const copyText = selectedText === '' ? alternativeText : selectedText;
    try {
      await navigator.clipboard.writeText(copyText);
    } catch (error) {
      return false;
    }
    return true;
  };

  return { copyLabel, runCopyToClipboard };
}