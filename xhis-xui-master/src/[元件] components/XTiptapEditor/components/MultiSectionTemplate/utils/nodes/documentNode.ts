import Document from '@tiptap/extension-document';

import { MULTI_SECTION_TEMPLATE_NODES } from '../../constants';

export interface DocumentNodeExtendedOptions {
  numberOfSections: number;
}

/**
 * 多章節的 document node
 * - 例如 SOAP 中，S, O, A, P 分別是一個章節
 *
 * document: @see https://tiptap.dev/docs/editor/extensions/nodes/document
 * source code: @see https://github.com/ueberdosis/tiptap/blob/main/packages/extension-document/src/document.ts
 */
export const DocumentNode = Document.extend<DocumentNodeExtendedOptions>({
  addOptions() {
    return {
      numberOfSections: 11,
    };
  },

  content() {
    return `${MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.NAME}{${this.options.numberOfSections}}`; // 這邊需指定特定數量的 section，如果使用 `section+` 允許一或多個 section nodes 的話，在換行等操作時，就可能會新增出一個 section node
  },
});
