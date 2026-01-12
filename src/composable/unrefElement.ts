import { unref, Ref, ComponentPublicInstance } from 'vue';

export type MaybeRef<T> = Ref<T> | T;
export type BasicElementType =
  | HTMLElement
  | SVGElement
  | ComponentPublicInstance
  | undefined
  | null;
export type MaybeElementRef = MaybeRef<BasicElementType>;

/**
 * Get the dom element of a ref of element or Vue component instance
 *
 * @param elRef
 * @see https://vueuse.org/core/unrefelement/
 */
export function unrefElement(
  elRef: MaybeElementRef
): HTMLElement | SVGElement | undefined {
  const plain = unref(elRef);
  return (plain as ComponentPublicInstance)?.$el ?? plain;
}
