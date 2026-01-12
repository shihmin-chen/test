import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';

import { getClipboardPlugin, getDeletePlugin } from '../plugins';

interface PluginBase extends Plugin {
  destroy?: () => void;
}

export const ProseMirrorPluginsExtension = Extension.create({
  name: 'proseMirrorPlugins',

  addOptions() {
    return {};
  },

  addProseMirrorPlugins() {
    const plugins = [getDeletePlugin(), getClipboardPlugin(this.editor.schema)];
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
