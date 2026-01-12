import { Editor } from '@tiptap/vue-3';
import { ref } from 'vue';

export const useCharacterCount = () => {
  // states
  const totalCharacter = ref(0);

  // utils
  const getStringLength = (string: unknown): number => {
    if (typeof string !== 'string') {
      return 0;
    }
    return string.length;
  };

  // mutations
  // 刷新 editor 當前的總字數
  // NOTE: 原本這 function 命名是 `updateTotalCharacter`，但這樣命名比較容易誤會是要把總字數帶進來更新，所以改名成 refresh
  const refreshTotalCharacter = (editor: Editor): number => {
    const { doc } = editor.state;
    const length = getStringLength(doc.textBetween(0, doc.content.size));
    totalCharacter.value = length;
    return length;
  };
  // NOTE: 以前這邊有 throttle update，但在 admission summary 的版本看起來沒有用到，所以這次先拿掉

  return {
    totalCharacter,
    refreshTotalCharacter,
  };
};
