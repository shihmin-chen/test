import { MaybeRef } from '@vueuse/core';
import { Props } from 'tippy.js';
import { ref, unref } from 'vue';

import { useTippy } from '../../../composable/';

/**
 * 客製樣式的 context menu (右鍵選單)
 *
 * @param disabled 是否禁用
 * @param tippyOptions 覆蓋的 tippy 選項
 * @returns
 * - contextMenuRef 綁定到 context menu 的 ref (i.e. 滑鼠右鍵時，會將這個綁定到的 DOM 顯示在 tippy 上)
 * - handleContextMenu 綁定 `@contextmenu` 事件的 handler
 * - hideContextMenu 關閉 context menu
 */
export const useContextMenu = (
  disabled: MaybeRef<boolean> = false,
  tippyOptions: Partial<Props> = {},
) => {
  // tippy
  // since we change reference client rect on contextmenu event, target is not important here
  const dummyTarget = ref<HTMLDivElement>(document.createElement('div'));
  const defaultTippyOptions: Partial<Props> = {
    trigger: 'manual',
    theme: 'dropdown',
    arrow: false,
    placement: 'right-start',
    interactive: true,
    offset: [0, 8],
    animation: false,
    appendTo: (document.getRootNode() as Document)?.body,
  };
  const { content: contextMenuRef, tippyInstance } = useTippy(
    dummyTarget,
    undefined,
    {
      ...defaultTippyOptions,
      ...tippyOptions,
    },
  );

  // event handlers
  const handleContextMenu = (event: MouseEvent): void => {
    if (unref(disabled)) {
      return;
    }
    event.preventDefault(); // 停用原生的右鍵選單 (QUESTION: 也許停用時，還是不要顯示出原生的右鍵選單比較合理?)

    // reference: https://atomiks.github.io/tippyjs/v6/misc/#context-menu
    unref(tippyInstance)?.setProps({
      getReferenceClientRect: () =>
        ({
          width: 0,
          height: 0,
          top: event.clientY,
          bottom: event.clientY,
          left: event.clientX,
          right: event.clientX,
        }) as DOMRect,
    });
    unref(tippyInstance)?.show();
  };
  const hideContextMenu = (): void => {
    unref(tippyInstance)?.hide();
  };

  return {
    contextMenuRef,
    handleContextMenu,
    hideContextMenu,
  };
};
