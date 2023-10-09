import SvgIcon from '@mui/material/SvgIcon';

import type { ArborCardProps } from '~appcraft/components';
import type { HierarchyData } from '~appcraft/services';
import type { NodePickerFn } from '~appcraft/hooks';

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
  onMutationSuccess?: (item: HierarchyData<string>) => void;

  onItemActionRender?: (
    data: HierarchyData<string>
  ) => ReturnType<ArborCardProps['onActionRender']>;
}
