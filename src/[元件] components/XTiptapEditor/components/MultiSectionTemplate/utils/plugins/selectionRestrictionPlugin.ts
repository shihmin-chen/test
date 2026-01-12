import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';

import { MULTI_SECTION_TEMPLATE_NODES } from '../../constants';

/**
 * 選取範圍插件
 * - 避免跨節點的框選 (例如 SOAP 中，從 S 的內容框到 O，可能會把 O 的標題也一起選中，且也要額外應對框選後再編輯的狀況)
 */
export const getSelectionRestrictionPlugin = () => {
  let selectStart = false;
  let keyDown = false;
  return new Plugin({
    key: new PluginKey('selectionRestriction'),
    props: {
      handleClick(view, pos, event) {
        // button event: @see https://developer.mozilla.org/docs/Web/API/MouseEvent/button
        if (event?.button === 0) {
          // 0 is left button
          const emptySelection = TextSelection.create(view.state.doc, pos);
          const transaction = view.state.tr.setSelection(emptySelection);
          view.dispatch(transaction);
        }
      },
      handleDOMEvents: {
        keydown: () => {
          keyDown = true;
        },
        keyup: () => {
          keyDown = false;
        },
        mouseleave: () => {
          selectStart = false;
        },
        selectstart: () => {
          selectStart = true;
        },
      },

      createSelectionBetween: (view, $anchor, $head) => {
        const { state } = view;
        const { doc, selection } = state;

        const anchor = $anchor;
        const head = $head;
        const anchorNodeKey = anchor.node(
          MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.DEPTH,
        )?.attrs?.key as string;
        const headNodeKey = head.node(
          MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.DEPTH,
        )?.attrs?.key as string;
        const anchorPos = anchor.pos;
        const headPos = head.pos;
        const anchorStartPos =
          anchor.start(MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.DEPTH) + 1; // TOODITEM: 這邊原本是用 `AICS_DISCHARGE_TEMPLATE`，需確認原因
        const anchorEndPos =
          anchor.end(MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.DEPTH) - 1; // TOODITEM: 這邊原本是用 `AICS_DISCHARGE_TEMPLATE`，需確認原因

        if (anchorNodeKey !== headNodeKey) {
          if (headPos > anchorPos) {
            const startPos = anchorPos;
            const endPos = doc.resolve(anchorEndPos).pos;
            const fromSelection = TextSelection.create(doc, startPos, endPos);
            return fromSelection;
          }
          if (headPos < anchorPos) {
            const startPos = doc.resolve(anchorStartPos).pos;
            const endPos = anchorPos;
            const fromSelection = TextSelection.create(doc, startPos, endPos);
            return fromSelection;
          }
        } else if (
          anchorPos === headPos &&
          !selection.empty &&
          !selectStart &&
          !keyDown
        ) {
          const startPos = anchorPos;
          const endPos = doc.resolve(anchorStartPos).pos;
          const fromSelection = TextSelection.create(doc, startPos, endPos);
          return fromSelection;
        }
        return null;
      },
    },
  });
};
