import type { Identifier } from 'dnd-core';
import type { RefObject } from 'react';

export type SortableDndMoveHandler = (
  dragIndex: number,
  hoverIndex: number
) => void;

export type SortableDndHookArgs = [
  symbol,
  string,
  number,
  SortableDndMoveHandler
];

export type SortableDndHookReturn<E extends HTMLElement> = {
  ref: RefObject<E>;
  handlerId: Identifier | null;
  isDragging: boolean;
};
