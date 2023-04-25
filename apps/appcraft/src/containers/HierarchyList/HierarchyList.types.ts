import SvgIcon from '@mui/material/SvgIcon';
import type { ReactNode } from 'react';

import type { HierarchyItemProps } from '~appcraft/components';

enum ActionType {
  addGroup,
  addItem,
  search,
}

export type HierarchyListAction = Record<keyof typeof ActionType, ReactNode>;

export interface HierarchyListProps {
  category: string;
  disableBreadcrumb?: boolean;
  disableGroup?: boolean;
  icon: typeof SvgIcon;

  onActionNodePick?: (
    nodes: HierarchyListAction
  ) => Partial<HierarchyListAction>;

  onItemActionRender?: HierarchyItemProps['onActionRender'];
}
