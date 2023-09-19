import SvgIcon from '@mui/material/SvgIcon';

import type { HierarchyData } from '~appcraft/services';
import type { HierarchyItemProps } from '~appcraft/components/common';
import type { NodePickerFn } from '~appcraft/hooks/common';

//* Variables
export type HandleGroupChange = (e: {
  item?: HierarchyData<string>;
  group?: string;
  isGroupRequired?: boolean;
}) => void;

//* Component Props
export interface HierarchyListProps {
  category: string;
  disableGroup?: boolean;
  icon: typeof SvgIcon;

  onActionNodePick?: NodePickerFn<'addGroup' | 'addItem' | 'search'>;
  onItemActionRender?: HierarchyItemProps['onActionRender'];
}
