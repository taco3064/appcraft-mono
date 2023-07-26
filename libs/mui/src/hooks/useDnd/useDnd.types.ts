import type { Identifier } from 'dnd-core';
import type { RefObject } from 'react';

export type DndMoveHandler = (dragIndex: number, hoverIndex: number) => void;

export type DndHookArgs = [symbol, number, DndMoveHandler];

export type DndHookReturn<E extends HTMLElement> = {
  ref: RefObject<E>;
  handlerId: Identifier | null;
  isDragging: boolean;
};
