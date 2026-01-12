import { Component } from 'vue';

interface DraggableBaseEvent {
  to: HTMLElement;
  from: HTMLElement;
}

export interface DraggableEvent extends DraggableBaseEvent {
  item: HTMLElement;
  clone: HTMLElement;
  oldIndex: number | undefined;
  newIndex: number | undefined;
  oldDraggableIndex: number | undefined;
  newDraggableIndex: number | undefined;
  pullMode: string | boolean | undefined;
}

interface BaseContext {
  index: number;
  element: unknown;
}

export interface DraggedContext extends BaseContext {
  futureIndex: number;
}

export interface RelatedContext extends BaseContext {
  list: HTMLElement[];
  component: Component;
}

export interface DraggableMoveEvent extends DraggableBaseEvent {
  dragged: HTMLElement;
  draggedRect: DOMRect;
  related: HTMLElement;
  relatedRect: DOMRect;
  willInsertAfter: boolean;
  draggedContext: DraggedContext;
  relatedContext: RelatedContext;
}
