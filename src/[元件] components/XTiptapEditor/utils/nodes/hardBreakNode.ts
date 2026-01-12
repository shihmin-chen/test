import HardBreak from '@tiptap/extension-hard-break';

/**
 * hard break node
 * - NOTE:
 *   hard break 的概念可以參考常規使用的一些文字編輯器，
 *   通常按下 enter 是換段落，可能有較大的留白。而 ctrl + enter 只是在段落裡面的換行。
 *   在 tiptap 的預設也是類似，按 enter 是會產生一個 paragraph node，
 *   而按下 ctrl + enter 則會在該 paragraph 裡面輸入 hard break node，用於表示換行。
 * - 這邊目前繼續沿用以前 soap editor 中，將輸入 hard break 的 hotkey 替換成執行換段落的作法。
 *   不確定以前這樣做的原因，也許是因為還沒有區分出段落的需求，因此這樣做在轉換 tiptap schema 時會比較簡單。
 *
 * document @see https://tiptap.dev/docs/editor/extensions/nodes/hard-break
 * source code: @see https://github.com/ueberdosis/tiptap/blob/main/packages/extension-hard-break/src/hard-break.ts
 */
export const BaseHardBreakNode = HardBreak.extend({
  addKeyboardShortcuts() {
    // 以下取消掉 ctrl + enter 以及 shift + enter 時輸入 hard break (註: 在 paragraph node 那邊將此 hotkeys 設為輸入一般的換行)
    return {};
  },
});
