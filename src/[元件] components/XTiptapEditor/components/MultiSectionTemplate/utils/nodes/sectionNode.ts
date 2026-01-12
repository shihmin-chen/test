import {
  mergeAttributes,
  Node,
  NodeViewProps,
  VueNodeViewRenderer,
} from '@tiptap/vue-3';
import { Component } from 'vue';

import SectionNodeView from '../../components/SectionNodeView.vue';
import { MULTI_SECTION_TEMPLATE_NODES } from '../../constants';

/**
 * section node
 * - 例如 SOAP 中，S, O, A, P 分別是一個章節
 */
export const SectionNode = Node.create({
  name: MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.NAME,

  group: 'block',

  content: 'block+',

  addAttributes() {
    // 對應 `SectionNodeAttrs`
    return {
      key: {
        default: undefined,
      },
      name: {
        default: undefined,
      },
      sectionOption: {
        default: undefined,
      },
    };
  },

  parseHTML() {
    return [{ tag: MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.NAME }];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    return [
      MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.NAME,
      mergeAttributes(HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(SectionNodeView as Component<NodeViewProps>);
  },
});
