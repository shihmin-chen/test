import { JSONContent } from '@tiptap/vue-3';

import { MULTI_SECTION_TEMPLATE_NODES } from '../constants';
import { SectionNodeAttrs } from '../types/sectionNode';

const LINE_SEPARATOR = '\n';

/**
 * 產生 section node 的 tiptap content
 *
 * @param text 欲轉換的純文字
 * @param sectionNodeAttrs section node 的自定義屬性
 * @returns section node 的 tiptap content
 */
export const generateSectionContentByPlainText = (
  text: string,
  sectionNodeAttrs: SectionNodeAttrs,
): JSONContent => {
  // TODOITEM: 確認看看是否需像以前那樣先將 \r\n 替換為 \n，也許 \r\n 是之前 cc 舊系統的資料才會有
  const textLines = text.split(LINE_SEPARATOR);
  const content: JSONContent[] = textLines.map((textLine) => ({
    type: 'paragraph', // TODOITEM: add node name constants?
    ...(textLine.length > 0
      ? {
          content: [
            {
              type: 'text', // TODOITEM: add node name constants?
              text: textLine,
            },
          ],
        }
      : {}), // NOTE: 這邊在 text line 為空字串時，必須讓 paragraph 沒有 content 欄位，不可以設為空陣列，否則在換行等操作中，游標會自動跳到最後面
  }));
  const sectionNode: JSONContent = {
    type: MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.NAME,
    attrs: sectionNodeAttrs,
    content,
  };
  return sectionNode;
};

/**
 * 產生 section node 的 tiptap content
 *
 * @param jsonString 欲轉換的 json tiptap conten
 * @param sectionNodeAttrs section node 的自定義屬性
 * @returns section node 的 tiptap content
 */
export const generateSectionContentByJsonString = (
  jsonString: string,
  sectionNodeAttrs: SectionNodeAttrs,
): JSONContent => {
  let content: JSONContent[];
  try {
    content = JSON.parse(jsonString);
  } catch (e) {
    return generateSectionContentByPlainText(jsonString, sectionNodeAttrs); // NOTE: 為了處理原本資料已經用 plain text 存，後來轉為存 json string 的話，這邊做個初次的轉換。
  }
  const sectionNode: JSONContent = {
    type: MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.NAME,
    attrs: sectionNodeAttrs,
    content,
  };
  return sectionNode;
};

/**
 * 產生 multi-section document node 的 tiptap content
 *
 * @param sectionContents document node 下的 section nodes content
 * @returns multi-section document node 的 tiptap content
 */
export const generateDocumentContent = (
  sectionContents: JSONContent[],
): JSONContent => {
  const sectionNode: JSONContent = {
    type: 'doc',
    content: sectionContents,
  };
  return sectionNode;
};

/**
 * 將 paragraph node 的 tiptap content 轉為純文字
 *
 * @param paragraphContent 欲轉換的 paragraph node 的 tiptap content
 * @returns 轉換後的純文字
 */
const getParagraphPlainText = (paragraphContent: JSONContent) => {
  let plainText = '';

  const traverse = (paragraph: JSONContent) => {
    paragraph.content?.forEach((child: JSONContent) => {
      // NOTE: 由於以前就把 hard break 的快捷鍵都替換成換段落的換行，可能因為這樣，在轉回純文字時就沒對 hard break 加上換行符了
      if (child.type === 'text') {
        plainText += child.text;
      } else {
        traverse(child);
      }
    });
  };

  traverse(paragraphContent);

  return plainText;
};

/**
 * 將 section node 的 tiptap content 轉為純文字
 *
 * @param paragraphContent 欲轉換的 section node 的 tiptap content
 * @returns 轉換後的純文字
 */
export const getSectionPlainText = (sectionContent: JSONContent): string => {
  // TODOITEM: 也許這邊先過濾 `node.type === 'paragraph'` 會更嚴謹
  const plainText =
    sectionContent.content
      ?.map((paragraphNode) => getParagraphPlainText(paragraphNode))
      .join(LINE_SEPARATOR) ?? '';
  return plainText;
};

/**
 * 將 section node 的 tiptap content 轉為 json string
 *
 * @param paragraphContent 欲轉換的 section node 的 tiptap content
 * @returns 轉換後的 json string
 */
export const getSectionJsonString = (sectionContent: JSONContent): string => {
  const sectionJsonString = JSON.stringify(sectionContent.content);
  return sectionJsonString;
};
