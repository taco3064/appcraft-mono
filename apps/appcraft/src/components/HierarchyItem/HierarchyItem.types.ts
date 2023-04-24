import SvgIcon from '@mui/material/SvgIcon';
import type { HierarchyData } from '~appcraft/services';

export interface HierarchyItemProps {
  data: HierarchyData<string>;
  icon: typeof SvgIcon;

  onClick: (data: HierarchyData<string>) => void;
  onPreview?: (data: HierarchyData<string>) => void;

  onDataModify: (
    mode: 'update' | 'remove',
    data: HierarchyData<string>
  ) => void;
}
