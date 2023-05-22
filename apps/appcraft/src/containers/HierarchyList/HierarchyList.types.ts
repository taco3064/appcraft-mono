import SvgIcon from '@mui/material/SvgIcon';

import type { HierarchyItemProps } from '~appcraft/components';
import type { NodePickerFn } from '~appcraft/hooks';

export interface HierarchyListProps {
  category: string;
  disableBreadcrumb?: boolean;
  disableGroup?: boolean;
  icon: typeof SvgIcon;

  onActionNodePick?: NodePickerFn<'addGroup' | 'addItem' | 'search'>;
  onItemActionRender?: HierarchyItemProps['onActionRender'];
}
