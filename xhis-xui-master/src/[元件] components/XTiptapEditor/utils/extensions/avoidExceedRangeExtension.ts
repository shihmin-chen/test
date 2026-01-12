import { Extension } from '@tiptap/vue-3';
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';

export const AvoidExceedRangeExtension = Extension.create({
  // 點擊位置超出文件範圍時，應強制將焦點設回文件末尾，避免無法觸發 Ctrl+V 等行為
  // https://aics-his.atlassian.net/browse/SDH-2959
  name: 'avoidExceedRange',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('avoidExceedRange'),
        props: {
          handleClick(view, pos) {
            const doc = view.state.doc;
            const lastNodePos = doc.content.size - 1;

            if (pos >= doc.content.size) {
              const tr = view.state.tr;
              tr.setSelection(
                TextSelection.near(view.state.doc.resolve(lastNodePos)),
              );
              view.dispatch(tr);
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
