<template>
  <div
    class="x-scroll-bar x-scroll-bar-md xfe-tiptap-editor h-full w-full overflow-auto"
  >
    <EditorContent
      :editor="editor"
      class="h-full w-full"
      spellcheck="false"
      @mousedown.stop="
        () => {
          return;
        }
      "
      @contextmenu="handleEditorContentContextMenu"
      @keydown="handleEditorContentKeydown"
    />
    <ContextMenu
      ref="contextMenuRef"
      :context-menu-item-groups="contextMenuItemGroups"
    />
  </div>
</template>

<script setup lang="ts">
import { JSONContent } from '@tiptap/core';
import { Editor, EditorContent, Extensions } from '@tiptap/vue-3';
import { isEqual } from 'lodash';
import { Transaction } from 'prosemirror-state';
import {
  computed,
  defineExpose,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  shallowRef,
  toRef,
  watch,
  WritableComputedRef,
} from 'vue';

import { useHotkey } from '../../composable/Hotkey';
import { XCU } from '../../xcu';

import ContextMenu from '../XContextMenu/ContextMenu.vue';
import { ContextMenuItemGroup } from '../XContextMenu/types/contextMenu';
import { getMultiSectionExtensions } from './components/MultiSectionTemplate/utils/extensionManager';
import {
  generateDocumentContent,
  generateSectionContentByJsonString,
  generateSectionContentByPlainText,
  getSectionJsonString,
  getSectionPlainText,
} from './components/MultiSectionTemplate/utils/tiptapContent';
import { useCharacterCount } from './composables/useCharacterCount';
import { useContextMenu } from './composables/useContextMenu';
import { getBaseExtensions } from './utils/extensionManager';
import { SectionDataItem, SectionOption } from './types/multiSection';

// module
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customExtension: {
      undo: () => ReturnType;
      redo: () => ReturnType;
    };
  }
}

// props & emit
const data = defineModel<SectionDataItem[]>('data', {
  type: Array as PropType<SectionDataItem[]>,
  default: () => [],
}); // 編輯資料的內容
const props = defineProps({
  sectionOptions: {
    type: Array as PropType<SectionOption[]>,
    default: () => [],
  }, // 編輯資料的選項
  jsonContent: { type: Boolean, default: false }, // data 是否為 json content
  readonly: { type: Boolean, default: false }, // 是否唯讀
  maxCharacterCount: { type: Number, default: undefined }, // 字數限制
  extensions: {
    type: Array as PropType<Extensions>,
    default: () => [],
  }, // 額外的 tiptap extensions
  contextMenuItemGroups: {
    type: Array as PropType<ContextMenuItemGroup[]>,
    default: () => [],
  }, // 右鍵選單
  enableSyncDataToTiptapContent: { type: Boolean, default: true }, // 是否啟用在 data prop 更新時，將其同步到 tiptap editor 的 content。
});

// data
/**
 * prop data 和 tiptap content 間的雙向轉換
 *
 * NOTE:
 * 在這個 editor 內，大多都是以 tiptap content 來操作，
 * 但外面用 tiptap content 來操作的話會太複雜，所以由這個 component 的這層 props 做轉換。
 *
 * NOTE:
 * 由於後續病程紀錄等功能可能會有插入表格等需求，但對應欄位可能還會是 string type，
 * 因此這個 component 應將 tiptap content stringify (`getSectionJsonString`) 後，傳出這個 component。
 * 但一些情境下，可能就只是需要純文字，這時就應該從 tiptap content 提取出文字 (`getSectionPlainText`)，傳出這個 component。
 * 由於目前病程紀錄那些都還是存成純文字，考量到未來有插入表格等需求時，會需要轉成存 json string，到時 db 可能同時存在純文字(舊資料)以及 json string(新資料)。
 * 因此這邊就不根據 data 是否能 json stringify 來判斷應轉出純文字或 json string，而是直接根據指定的 `jsonContent` prop，
 * 當 `jsonContent` 指定為 true 時，讀入資料支援處理 json string 和 純文字 到 tiptap content 的轉換，並在傳出時一率轉為 json string。
 * 而當 `jsonContent` 指定為 false 時，讀入資料則將該純文字轉為 tiptap content，並在傳出時轉回純文字。
 */
const getTiptapContent = (sectionData: SectionDataItem[]) => {
  // model value type -> tiptap content
  const generateSectionContent = props.jsonContent
    ? generateSectionContentByJsonString
    : generateSectionContentByPlainText;
  const sectionContents = sectionData.map((item) => {
    const sectionOption = props.sectionOptions.find((option) => option.key === item.key);
    return generateSectionContent(item.text, {
      key: item.key,
      name: sectionOption?.name ?? '',
      sectionOption: sectionOption!,
    })
  });
  const documentContent = generateDocumentContent(sectionContents);
  return documentContent;
}
const getSectionData = (tiptapContent: JSONContent) => {
  // tiptap content -> model value type
  const getSectionString = props.jsonContent
    ? getSectionJsonString
    : getSectionPlainText;
  const sectionData =
    tiptapContent.content?.map((sectionContent) => ({
      key: sectionContent.attrs?.key,
      text: getSectionString(sectionContent),
    })) ?? [];
  return sectionData;
}
const tiptapContent: WritableComputedRef<JSONContent> = computed({
  get: () => getTiptapContent(data.value),
  set: (tiptapContent) => {
    data.value = getSectionData(tiptapContent);
  },
});

// character count
// TODOITEM: 把以下一部分邏輯搬進 composable 裡? 理想上應該傳 editor 和最大字數限制，就在裡面處理好 undo 這些邏輯了
// TODOITEM: 試試看改用 `filterTransaction` plugin 來做字數限制?
const { refreshTotalCharacter, totalCharacter } = useCharacterCount();
const showErrorDialog = async () => {
  XCU().Dialog.Utils.requestDangerConfirmDialog({
    title: '無法再輸入文字',
    content: '已超過可輸入字數上限',
    primaryButton: {
      text: '我知道了',
    },
  });
};
const verifyTotalWordCount = (totalCharacter: number) => {
  const isVerifyPass =
    props.maxCharacterCount === undefined ||
    totalCharacter <= props.maxCharacterCount;
  return isVerifyPass;
};
const handleVerifyWordCount = async ({
  editor: _editor,
  transaction: _transaction,
}: {
  editor: Editor;
  transaction: Transaction;
}) => {
  refreshTotalCharacter(_editor as Editor);
  if (!verifyTotalWordCount(totalCharacter.value)) {
    // TODOITEM: 在 opd v3 的時候，這邊還有根據 `isContextPasting` 做檢查，需確認當時添加的原因
    await showErrorDialog();
    editor.value.commands.undo(); // TODOITEM: 也許不要 undo，而是讓內容停留在正好為最大字數限制時的長度? 這樣內容不會跳動，體驗上可能比較好
  }

  // QUESTION: 以前這邊 undo 後又 redo 可能是遇到什麼問題?
  editor.value.can().undo();
  editor.value.can().redo();
};

// editor
const handleUpdateEditorContent = async (options: {
  editor: Editor;
  transaction: Transaction;
}) => {
  // NOTE: 這邊是處理由 tiptap editor 內部觸發的資料更新

  if (props.readonly) {
    return;
  }
  tiptapContent.value = options.editor.getJSON(); // 這邊設置值，以讓改動傳遞到 component 外部

  await handleVerifyWordCount(options);
};

// 目前焦點所在的 section 名稱
const currentSection = ref('');
// 取得目前焦點所在的區段名稱
const updateCurrentSection = (editor: Editor) => {
  const { $anchor } = editor.state.selection; // 取得當前游標位置
  let depth = $anchor.depth;

  while (depth >= 0) {
    const node = $anchor.node(depth); // 往上找父節點
    if (node.type.name === 'section') {
      currentSection.value = node.attrs.name || node.attrs.key; // 取出 section 的 name 或 key
      return;
    }
    depth--;
  }

  currentSection.value = ''; // 如果找不到 section，清空值
};

const getInitEditor = () => {
  const extensions = [
    ...getBaseExtensions(),
    ...getMultiSectionExtensions({
      numberOfSections: props.sectionOptions.length,
    }),
    ...props.extensions,
  ];

  return new Editor({
    content: tiptapContent.value,
    editable: !props.readonly,
    extensions,
    onUpdate: (props) => {
      handleUpdateEditorContent({
        editor: props.editor as Editor,
        transaction: props.transaction,
      }); // NOTE: 這邊的 editor type 是 `@tiptap/core` 中的 `Editor`
    },
    onBlur: () => {
      currentSection.value = '';
    },
    onFocus: (props) => {
      updateCurrentSection(props.editor as Editor);
    },
    onSelectionUpdate: (props) => {
      updateCurrentSection(props.editor as Editor);
    },
  });
};
const editor = shallowRef(getInitEditor());
const initEditor = () => {
  destroyEditor();
  editor.value = getInitEditor();
};
const destroyEditor = () => {
  editor.value?.destroy?.();
  editor.value = null as unknown as Editor;
};
onBeforeUnmount(() => {
  destroyEditor();
});
watch(
  () => props.readonly,
  (value) => {
    editor.value.setOptions({ editable: !value });
  },
  { immediate: true },
);
/**
 * 處理 data model value 更新時，同步到 tiptap editor 的 content。
 *
 * NOTE:
 * 目前額外用 `enableSyncDataToTiptapContent` 來控制，
 * 是因為在以純文字的模式使用的話，當 tiptap editor 設置 mark 等樣式並 emit 出去時 (例如 spell check error 的紅線)，
 * 在觸發將這個外部改動更新進 tiptap editor 時就會導致上述樣式遺失。
 * 由於目前已經有幾個地方使用這個 xui component 了，目前先額外開參數來處理向下兼容。
 * 
 * TODOITEM:
 * 這邊的邏輯滿亂的，可能需再思考一下怎麼調整介面:
 * - 選擇1:
 *   拿掉 data model value，在這個 tiptap editor component 維護一個非純文字的 state。
 *   然後外部使用時，設值和取值都透過 expose。
 *   - 缺點: 因為 tiptap editor 類似於 textarea，感覺相對於直接用 `v-model` 綁定資料來說，使用上會變得比較不直覺。
 * - 選擇2:
 *   介面統一只支援使用非純文字的模式 (`jsonContent` 為 `true`)。
 *   然後外部要以純文字的設值，或將值轉為純文字時，再另外使用 expose 的 function 或 computed ref。
 *   - 缺點: 類似選擇1的卻點，使用上會變得比較不直覺。
 */
const enableSyncDataToTiptapContentWatcher = ref<(() => void) | undefined>(undefined);
watch(() => props.enableSyncDataToTiptapContent,
  () => {
    if (props.enableSyncDataToTiptapContent) {
      enableSyncDataToTiptapContentWatcher.value = watch(
        () => tiptapContent.value,
        () => {
          // 如果是從 tiptap 內部編輯的，資料一致就不需 set content
          // NOTE: 實測起來，如果這邊沒有 early return，每次輸入文字時，游標都會跳到最後面
          /**
           * NOTE:
           * 這邊多做一次轉成 section data，是因為在使用純文字 model value 時，
           * 某些情境下可能還是需要暫時設置一些 mark (e.g. spell check)，
           * 當 mark 更新進 tiptap content，再觸發更新 section data 時，會因為使用純文字而將 mark 這些結構移除，導致 mark 在同步回來時被清掉。
           * 因此目前做法:
           * - 下到上 (tiptap content -> section data) 更新時，model value 那邊還是保有轉為純文字。
           * - 上到下 (section data -> tiptap content) 更新時，檢查都轉為純文字時的結果是否相同，如果相同，表示當前 tiptap editor 裡面去掉 mark 等結構後的文字不變，這時就不更新以保留 mark。
           * 而如果是由使用端主動更新 section data 時，也還是能因為和當下 tiptap editor 的內容不同而做同步，但這時會將 mark 等結構移除。
           */
          if (isEqual(getSectionData(tiptapContent.value), getSectionData(editor.value.getJSON()))) {
            return;
          }

          // 更新內容自 tiptap content
          editor.value.commands.setContent(tiptapContent.value); // NOTE: 實測起來，在 component 外面的資料更新時，需透過 `setContent` 才能將資料同步更新到 tiptap
        },
        { deep: true, immediate: true },
      );
    } else {
      enableSyncDataToTiptapContentWatcher.value?.();
      enableSyncDataToTiptapContentWatcher.value = undefined;
    }
  },
  { immediate: true },
);
watch(
  () => props.sectionOptions,
  (newValue, oldValue) => {
    // 在改變 section options 等情況下，需要重新建立 editor，以套用到對應的 extensions
    if (isEqual(newValue, oldValue)) {
      return;
    }
    initEditor();
  },
  { deep: true },
);

// hotkey
const { preventGlobalHotkeyOnFocus } = useHotkey();
onMounted(() => {
  preventGlobalHotkeyOnFocus(editor.value.view.dom, [
    ['Tab'],
    ['Shift', 'Tab'],
    ['Control', 'KeyA'],
    ['Control', 'KeyZ'],
    ['Control', 'KeyY'],
  ]);
});

// context menu
const {
  contextMenuRef,
  contextMenuItemGroups: baseContextMenuItemGroups,
  showEditorContextMenu,
  hideEditorContextMenu,
} = useContextMenu(editor, toRef(props, 'readonly'));
const contextMenuItemGroups = computed<ContextMenuItemGroup[]>(() => [
  /**
   * TODOITEM:
   * 目前這樣把 base context menu 和 custom 的串起來的話，不太客製化。
   * 例如如果需要在 base 裡面的 group 插入 item 或要換順序，就不能滿足。
   * 也許改成如果輸入 custom context menu 就直接用它? 但同時也需要用 base context menu 的話，可能要讓 base context menu export 出去。
   */
  ...baseContextMenuItemGroups.value,
  ...props.contextMenuItemGroups,
]);
const handleEditorContentContextMenu = (event: MouseEvent) => {
  // 對編輯內容滑鼠右鍵時
  // 顯示 context menu
  showEditorContextMenu(event);
};
const handleEditorContentKeydown = () => {
  // 鍵盤輸入編輯內容時
  // 隱藏 context menu
  hideEditorContextMenu();
};

// expose
defineExpose({
  editor,
  initEditor,
  currentSection,
});
</script>

<style lang="scss">
.xfe-tiptap-editor {
  .tiptap.ProseMirror {
    // WORKAROUND: 這邊的樣式是為了可以讓指定的 section grow，目前還沒找到方法設置 `VueNodeViewRenderer` 產生的 DOM 的 style，所以先在這邊根據它帶有的 class 來設置。
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>

<style lang="scss" scoped>
.xfe-tiptap-editor {
  // override prose mirror styles
  :deep(.ProseMirror) {
    padding: 0;
    margin: 0;
    white-space: break-spaces;

    &:focus {
      outline: none;
      box-shadow: none;
    }

    p {
      padding: 0;
      margin: 0;
      &.is-editor-empty:first-child::before {
        height: 0;
        color: var(--xv-text--disabled-placeholder-text);
        content: attr(data-placeholder);
        float: left;
        pointer-events: none;
      } // TODOITEM: 確認這個 style 的用途以及是否要留著
    }
  }
}
</style>
