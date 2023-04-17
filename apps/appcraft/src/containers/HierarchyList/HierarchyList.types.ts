import SvgIcon from '@mui/material/SvgIcon';
import type { ReactNode } from 'react';

enum ActionType {
  addGroup,
  addItem,
  search,
}

export type HierarchyListActionName = keyof typeof ActionType;
export type HierarchyListAction = Record<HierarchyListActionName, ReactNode>;

export interface HierarchyListProps {
  category: string;
  disableBreadcrumb?: boolean;
  icon: typeof SvgIcon;

  onActionNodeSplit?: (
    nodes: HierarchyListAction
  ) => Partial<HierarchyListAction>;
}
