import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { SwitchProps } from '@mui/material/Switch';

export type IconOptions = {
  tooltip?: string;
  icon: ComponentType<SvgIconProps>;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
};

export interface IconSwitchProps<V extends string>
  extends Omit<
    SwitchProps,
    'defaultChecked' | 'checked' | 'color' | 'onChange'
  > {
  options: { [key in V]: IconOptions };
  value: V;
  onChange: (value: V) => void;
}
