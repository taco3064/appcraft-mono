import type { RefObject } from 'react';
import type { HierarchyData } from '~appcraft/services';

export type DndType = Record<HierarchyData<string>['type'], symbol>;

export type HierarchyDndHandler = (
  item: HierarchyData<string>,
  newGroupId: string
) => void;

export type HierarchyDndHookArgs = [
  boolean,
  HierarchyData<string>,
  HierarchyDndHandler
];

export type HierarchyDndHookReturn<E extends HTMLElement> = {
  ref: RefObject<E>;
  status: 'dragging' | 'over' | null;
};
