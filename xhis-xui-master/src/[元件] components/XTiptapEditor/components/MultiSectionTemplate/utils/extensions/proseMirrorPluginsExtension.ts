import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';

import {
  getFilterTransactionPlugin,
  getSelectionRestrictionPlugin,
} from '../plugins';

interface PluginBase extends Plugin {
  destroy?: () => void;
}

export const ProseMirrorPluginsExtension = Extension.create({
  name: 'multiSectionProseMirrorPlugins',

  addOptions() {
    return {};
  },

  addProseMirrorPlugins() {
    const plugins = [
      getFilterTransactionPlugin(),
      getSelectionRestrictionPlugin(),
    ];
    return plugins;
  },

  onDestroy() {
    this.editor.extensionManager.plugins.forEach((plugin: PluginBase) => {
      if (plugin.destroy) {
        plugin.destroy();
      }
    });
  },
});
