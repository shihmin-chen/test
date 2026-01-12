import { Extensions } from '@tiptap/vue-3';

import {
  ProseMirrorPluginsExtension as MultiSectionProseMirrorPluginsExtension,
  SelectAllExtension as MultiSectionSelectAllExtension,
  SwitchSectionExtension as MultiSectionSwitchSectionExtension,
} from './extensions';
import {
  DocumentNodeExtendedOptions,
  DocumentNode as MultiSectionDocumentNode,
  SectionNode as MultiSectionSectionNode,
} from './nodes';

export const getMultiSectionExtensions = (
  documentNodeOptions: DocumentNodeExtendedOptions,
): Extensions => {
  const multiSectionExtensions = [
    // nodes
    MultiSectionDocumentNode.configure(documentNodeOptions),
    MultiSectionSectionNode,

    // extensions
    MultiSectionSelectAllExtension,
    MultiSectionSwitchSectionExtension,
    MultiSectionProseMirrorPluginsExtension.configure(),
  ];
  return multiSectionExtensions;
};
