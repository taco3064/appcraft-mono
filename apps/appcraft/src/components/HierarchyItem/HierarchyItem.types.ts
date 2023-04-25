import SvgIcon from '@mui/material/SvgIcon';
import type { HierarchyData } from '~appcraft/services';

export interface HierarchyItemProps {
  data: HierarchyData<string>;
  icon: typeof SvgIcon;

  onActionRender?: (data: HierarchyData<string>) => JSX.Element;
  onClick: (data: HierarchyData<string>) => void;

  onDataModify: (
    mode: 'update' | 'remove',
    data: HierarchyData<string>
  ) => void;
}
