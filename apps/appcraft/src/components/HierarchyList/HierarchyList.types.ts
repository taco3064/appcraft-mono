import { ReactNode } from 'react';

enum ActionType {
  addGroup,
  addItem,
}

export type HierarchyListActionName = keyof typeof ActionType;
export type HierarchyListAction = Map<
  HierarchyListActionName,
  ReactNode | null
>;

export interface HierarchyListProps {
  category: string;

  onActionNodeSplit?: (
    name: HierarchyListActionName,
    node: ReactNode
  ) => Promise<ReactNode | null>;
}
