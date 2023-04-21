import SvgIcon from '@mui/material/SvgIcon';
import type { ReactNode } from 'react';

enum ActionType {
  addGroup,
  addItem,
  search,
}

export type HierarchyListAction = Record<keyof typeof ActionType, ReactNode>;

export interface HierarchyListProps {
  category: string;
  disableBreadcrumb?: boolean;
  icon: typeof SvgIcon;

  onActionNodePick?: (
    nodes: HierarchyListAction
  ) => Partial<HierarchyListAction>;
}
