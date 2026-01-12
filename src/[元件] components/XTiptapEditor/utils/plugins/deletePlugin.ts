import { Plugin, PluginKey } from 'prosemirror-state';

/**
 * 刪除文字插件
 * - 避免其中一個 node 刪光時，繼續刪的話會讓游標移動到其他 node
 */
export const getDeletePlugin = () => {
  return new Plugin({
    key: new PluginKey('delete'),
    props: {
      handleKeyDown(view, event) {
        const { $anchor, $head } = view.state.selection;

        // event key: @see https://developer.mozilla.org/docs/Web/API/KeyboardEvent/key
        if (event.key === 'Backspace') {
          if (
            $anchor.pos === $head.pos &&
            $anchor.pos === $anchor.before() + 1 &&
            $anchor.index($anchor.depth - 1) === 0
          ) {
            return true;
          }
        }
        if (event.key === 'Delete') {
          if (
            $anchor.pos === $head.pos &&
            $anchor.pos === $anchor.after() - 1 &&
            $anchor.index($anchor.depth - 1) ===
              $anchor.node($anchor.depth - 1).content.childCount - 1
          ) {
            return true;
          }
        }

        return false;
      },
    },
  });
};
