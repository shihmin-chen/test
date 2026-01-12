import Focus from '@tiptap/extension-focus';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import { Extensions } from '@tiptap/vue-3';

import {
  AvoidExceedRangeExtension,
  HistoryExtension,
  ProseMirrorPluginsExtension,
} from './extensions';
import { BaseHardBreakNode, BaseParagraphNode } from './nodes';

export const getBaseExtensions = (): Extensions => {
  const baseExtensions = [
    // nodes
    BaseParagraphNode,
    BaseHardBreakNode,
    Text,

    // marks
    TextStyle,

    // extensions
    Focus.configure({
      mode: 'all',
    }),
    HistoryExtension,
    Placeholder.configure({
      placeholder: '請輸入',
      showOnlyCurrent: false,
    }),
    AvoidExceedRangeExtension,
    ProseMirrorPluginsExtension.configure(),
  ];
  return baseExtensions;
};
