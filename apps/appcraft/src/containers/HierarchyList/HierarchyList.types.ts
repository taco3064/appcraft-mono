import SvgIcon from '@mui/material/SvgIcon';
import type { NodePickerFn } from '@appcraft/mui';

import type { HierarchyItemProps } from '~appcraft/components';

export interface HierarchyListProps {
  category: string;
  disableBreadcrumb?: boolean;
  disableGroup?: boolean;
  icon: typeof SvgIcon;

  onActionNodePick?: NodePickerFn<'addGroup' | 'addItem' | 'search'>;
  onItemActionRender?: HierarchyItemProps['onActionRender'];
}
