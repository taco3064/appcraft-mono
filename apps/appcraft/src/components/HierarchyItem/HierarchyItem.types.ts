import SvgIcon from '@mui/material/SvgIcon';
import type { ReactNode } from 'react';

import type { HierarchyData } from '~appcraft/services';

export interface HierarchyItemProps {
  mutation?: ReactNode;
  data: HierarchyData<string>;
  icon: typeof SvgIcon;

  onActionRender?: (data: HierarchyData<string>) => JSX.Element;
  onClick: (data: HierarchyData<string>) => void;
}
