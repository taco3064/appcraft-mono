import type { BadgeProps } from '@mui/material/Badge';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export interface CompositeIconProps {
  anchorOrigin?: BadgeProps['anchorOrigin'];
  primary: typeof SvgIcon;
  primaryProps?: SvgIconProps;
  secondary: typeof SvgIcon;
  secondaryProps?: Omit<SvgIconProps, 'fontSize'>;
  classes?: {
    primary?: string;
    secondary?: string;
    badge?: string;
  };
}
