import SvgIcon from '@mui/material/SvgIcon';
import type { HierarchyData } from '~appcraft/services';

export interface HierarchyCardProps {
  data: HierarchyData<string>;
  icon: typeof SvgIcon;
}
