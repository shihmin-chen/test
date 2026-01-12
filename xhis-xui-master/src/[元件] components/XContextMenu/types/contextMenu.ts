export interface ContextMenuItem {
  name: string; // 選項的顯示名稱
  disabled?: boolean; // 是否禁用
  callback?: () => void | Promise<void>; // click 時執行的 callback function
  mouseDownCallback?: () => void; // mouse down 時執行的 callback function (註: 有些情境可能需要一按下去就觸發，而不是像 click 那樣 mouse up 時才觸發)
}

export interface ContextMenuItemGroup {
  items: ContextMenuItem[];
}
