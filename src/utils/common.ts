import { VNode, Component } from 'vue';

export type IsComponentType = keyof HTMLElementTagNameMap | Component | VNode;
export type DataKeyIndex =
  | string
  | string[]
  | ((item: Record<string | number | symbol, unknown>) => string)
  | undefined;

/**
 * Get key index of an item, useful for components that require "key" for "v-for", and
 * provide user the ability to customize this key
 *
 * @param keyIndex key index to specify unique key of items, could be function, array or string
 * @param item item
 * @param [fallback=''] fallback column as key index if keyIndex is not a valid type
 * @return {*}  {string}
 */
export function getKeyIndex(
  keyIndex: DataKeyIndex,
  item: Record<string, unknown>,
  fallback = ''
): string {
  if (typeof keyIndex === 'string') {
    return item[keyIndex] as string;
  } else if (Array.isArray(keyIndex)) {
    return keyIndex.map((index) => item[index]).join('|');
  } else if (typeof keyIndex === 'function') {
    return keyIndex(item);
  }
  return item[fallback] as string;
}
