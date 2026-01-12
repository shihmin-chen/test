import Paragraph, { ParagraphOptions } from '@tiptap/extension-paragraph';
import { callOrReturn, getExtensionField } from '@tiptap/vue-3';

/**
 * paragraph node
 * - 每次按下 enter 換行就是一個新的段落，段落中包含 text node 等。
 *
 * document: @see https://tiptap.dev/docs/editor/extensions/nodes/paragraph
 * source code: @see https://github.com/ueberdosis/tiptap/blob/main/packages/extension-paragraph/src/paragraph.ts
 */
export const BaseParagraphNode = Paragraph.extend({
  whitespace: 'pre', // 預設值 'normal' 表示讓 DOM parser 摺疊空白 (包含換行符替換為空白符)，而 'pre' 則保留空白。(TODOITEM: 但我實測起來，text node 下的空白符都沒被折疊，也許不用覆蓋這個設置?)

  extendNodeSchema(extension) {
    // TODOTIEM: 看不懂以下擴展 whitespace 的用意是什麼? 目前先保留，後續應確認。
    const context: Omit<unknown, 'parent'> = {
      name: extension.name,
      options: extension.options as ParagraphOptions,
      storage: extension.storage as unknown,
    };
    const extensionField: string | undefined = getExtensionField(
      extension,
      'whitespace',
      context,
    );
    return {
      whitespace: callOrReturn(extensionField),
    };
  },

  addCommands() {
    // TODOITEM: 這樣做應該是為了將預設的 `setParagraph` command 蓋掉，它應該是用於將選中的 node 轉為 paragraph node。但我還沒試出在什麼情境下會發生問題，要再確認看看是否要保留這段 code。
    return {};
  },

  addKeyboardShortcuts() {
    return {
      // 以下讓按下 ctrl + enter 以及 shift + enter 時執行換行 (註: 在 tiptap 預設中，這些 hotkeys 是會輸入 hard break node，i.e. 在段落裡面的換行)
      'Mod-Enter': () => this.editor.commands.enter(),
      'Shift-Enter': () => this.editor.commands.enter(),
    };
  },
});
