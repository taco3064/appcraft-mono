import { ReactNode } from 'react';

enum ActionType {
  addGroup,
  keywordSearch,
}

export type HierarchyListActionName = keyof typeof ActionType;
export type HierarchyListAction = Record<HierarchyListActionName, ReactNode>;

export interface HierarchyListProps {
  category: string;

  onActionNodeSplit?: (
    nodes: HierarchyListAction
  ) => Partial<HierarchyListAction>;
}
