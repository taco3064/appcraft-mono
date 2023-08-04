import SvgIcon from '@mui/material/SvgIcon';
import type { ReactNode } from 'react';

import type { HierarchyData } from '~appcraft/services';
import type { HierarchyDndHandler } from '~appcraft/hooks';

export interface HierarchyItemProps {
  mutation?: ReactNode;
  data: HierarchyData<string>;
  disableGroupChange?: boolean;
  icon: typeof SvgIcon;

  onActionRender?: (data: HierarchyData<string>) => JSX.Element;
  onClick: (data: HierarchyData<string>) => void;
  onGroupChange: HierarchyDndHandler;
}
