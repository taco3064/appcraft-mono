import { DndContext } from '@dnd-kit/core';
import type { ComponentProps, RefObject } from 'react';

//* Variables
export type GridItemSpan = {
  cols: number;
  rows: number;
};

export type SizeRecord = {
  el: HTMLElement;
  columnWidth: number;
  itemHeight: number;
  itemWidth: number;
  x: number;
  y: number;
};

//* Methods
type DndHandles = Pick<
  ComponentProps<typeof DndContext>,
  'onDragEnd' | 'onDragMove' | 'onDragStart'
>;

export type DndHandleProps<T extends { id: string }> = {
  onResize?: (item: T, size: GridItemSpan) => void;
  onResort?: (items: T[]) => void;
};

export type GetColsAndRowsFn = (
  cols: number,
  rowHeight: number,
  record: SizeRecord
) => GridItemSpan;

//* Custom Hooks
export type DndHandlesHookArgs<T extends { id: string }> = [
  number,
  number,
  T[],
  DndHandleProps<T>
];

export type DndHandlesHookReturnType = [
  RefObject<HTMLUListElement>,
  DndHandles
];
