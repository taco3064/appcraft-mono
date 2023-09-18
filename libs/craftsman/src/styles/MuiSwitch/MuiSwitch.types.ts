import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { SwitchProps } from '@mui/material/Switch';

export type SwitchIcon = ComponentType<SvgIconProps>;

export interface IconSwitchProps<T extends string, F extends string>
  extends Omit<SwitchProps, 'defaultChecked' | 'checked' | 'onChange'> {
  icons: Record<T | F, SwitchIcon>;
  value: T | F;
  onChange: (value: T | F) => void;
}
