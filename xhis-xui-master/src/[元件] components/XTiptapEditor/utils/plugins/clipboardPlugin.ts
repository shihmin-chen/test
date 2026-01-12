import { DOMSerializer, Fragment, Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';

/**
 * 剪貼簿插件
 *
 * TODOITEM: 後續應再 review 一下這段 code 的用途，大致看起來和 html DOM 序列化相關，可能是為了將轉換貼上的 html。
 */
export const getClipboardPlugin = (schema: Schema): Plugin => {
  const serializer = DOMSerializer.fromSchema(schema);
  const clipboardSerializer = Object.assign(serializer, {
    serializeFragment: (fragment: Fragment) => {
      const root = document.createDocumentFragment();

      fragment.descendants((node) => {
        if (node.type?.name === 'paragraph') {
          const p = document.createElement('p');
          node.descendants((child) => {
            if (child.isText) {
              const textNode = serializer.serializeNode(child);
              p.appendChild(textNode);
            }
          });
          root.appendChild(p);
        }
      });

      return root;
    },
  });

  return new Plugin({
    key: new PluginKey('clipboard'),
    props: {
      clipboardSerializer,
      clipboardTextSerializer(slice) {
        let text = '';
        const separator = '\n';

        slice.content.descendants((node) => {
          if (node.isTextblock && node.textContent) {
            text += node.textContent + separator;
          }
        });

        return text;
      },
      transformPastedHTML(html: string) {
        let newHtml = '';
        const fragment = document.createRange().createContextualFragment(html);
        const htmlArray = Array.from(fragment.children);
        htmlArray.forEach((element: Element) => {
          if (element.tagName === 'P') {
            newHtml += `<p>${element.textContent}</p>`;
          } else if (element.tagName === 'SPAN') {
            newHtml += `<span>${element.textContent}</span>`;
          } else {
            const collections = element.getElementsByTagName('*');
            const nodes = Array.from(collections);
            nodes.forEach((child) => {
              if (child.tagName === 'P') {
                newHtml += `<p>${child.textContent}</p>`;
              } else if (
                child.tagName === 'SPAN' &&
                child.parentElement?.tagName !== 'P' // if the parent element is 'p', it should have been appended.
              ) {
                newHtml += `<span>${child.textContent}</span>`;
              }
            });
          }
        });
        return newHtml.replaceAll('\n', '<br>');
      },
      handleDrop() {
        return false;
      },
      handlePaste() {
        return false;
      },
    },
  });
};
