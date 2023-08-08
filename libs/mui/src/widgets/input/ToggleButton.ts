import ToggleButton from '@mui/material/ToggleButton';
import type { ComponentProps } from 'react';

export { ToggleButton };

export type ToggleButtonProps = Pick<
  ComponentProps<typeof ToggleButton>,
  | 'value'
  | 'children'
  | 'color'
  | 'disabled'
  | 'disableRipple'
  | 'fullWidth'
  | 'onChange'
  | 'onClick'
  | 'selected'
  | 'size'
>;
