import type * as Appcraft from '@appcraft/types';
import SvgIcon from '@mui/material/SvgIcon';

export interface MixedFieldProps {
  icon: typeof SvgIcon;
  options: Appcraft.OneOfTypeProp;
}
