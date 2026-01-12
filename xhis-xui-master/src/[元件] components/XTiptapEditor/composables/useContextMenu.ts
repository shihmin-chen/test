import { Editor } from '@tiptap/vue-3';
import { computed, MaybeRef, ref, ShallowRef, unref } from 'vue';

import ContextMenu from '../../ContextMenu/ContextMenu.vue';
import { ContextMenuItemGroup } from '../../XContextMenu/types/contextMenu';

export const useContextMenu = (
  editor: ShallowRef<Editor>,
  readonly: MaybeRef<boolean>,
) => {
  // states
  const contextMenuRef = ref<InstanceType<typeof ContextMenu>>(); // content menu component ref
  const isCutDisabled = ref<boolean>(true); // 是否禁用剪下
  const isCopyDisabled = ref<boolean>(true); // 是否禁用複製
  const isPasteDisabled = ref<boolean>(true); // 是否禁用貼上

  // utils
  const getSelectedText = () => {
    const { from, to } = editor.value.state.selection;
    const selectedText = editor.value.state.doc.textBetween(from, to, '\n');
    return selectedText;
  };
  const setContextMenuItemDisable = () => {
    // NOTE: 以前 opd v2 在這邊還有根據是否跨 section 選取來禁用貼上，但後來已經有阻擋跨 section 的選取範圍，所以先拿掉，盡量讓這邊的 code 沒有參雜 multi-section template 的邏輯
    // NOTE: 這邊 disable 的寫法，感覺改成讓各 context menu item 各自 computed 算出來的話，應該會比較好讀，但這樣在還沒打開 context menu 時也會計算，比較浪費。
    const isReadonly = unref(readonly);
    const { empty: isEmpty } = editor.value.state.selection;
    isCutDisabled.value = isReadonly || isEmpty;
    isCopyDisabled.value = isEmpty;
    isPasteDisabled.value = isReadonly;
  };

  // context menu items
  const contextMenuItemGroups = computed<ContextMenuItemGroup[]>(() => [
    {
      items: [
        {
          name: '剪下(Ctrl+X)',
          disabled: isCutDisabled.value,
          callback: async () => {
            const selectedText = getSelectedText();
            await navigator.clipboard.writeText(selectedText);
            editor.value.commands.deleteSelection();
          },
        },
        {
          name: '複製(Ctrl+C)',
          disabled: isCopyDisabled.value,
          callback: async () => {
            const selectedText = getSelectedText();
            await navigator.clipboard.writeText(selectedText);
            editor.value.commands.focus();
          },
        },
        {
          name: '貼上(Ctrl+V)',
          disabled: isPasteDisabled.value,
          callback: async () => {
            const pasteText = await navigator.clipboard.readText();
            const { view } = editor.value;
            editor.value.commands.deleteSelection();
            view.dispatch(
              view.state.tr.insertText(pasteText.replace(/\n$/, '')),
            );
          },
        },
      ],
    },
  ]);

  // show/hide context menu
  const showEditorContextMenu = (event: MouseEvent) => {
    setContextMenuItemDisable();
    if (!contextMenuRef.value) {
      return;
    }
    (
      contextMenuRef.value as {
        handleContextMenu: (event: MouseEvent) => void;
      }
    ).handleContextMenu(event);
  };
  const hideEditorContextMenu = () => {
    if (!contextMenuRef.value) {
      return;
    }
    (
      contextMenuRef.value as {
        hideContextMenu: () => void;
      }
    ).hideContextMenu();
  };

  return {
    contextMenuRef,
    contextMenuItemGroups,
    showEditorContextMenu,
    hideEditorContextMenu,
  };
};
