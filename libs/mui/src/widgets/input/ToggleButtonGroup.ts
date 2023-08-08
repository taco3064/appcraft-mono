import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { ComponentProps } from 'react';

export { ToggleButtonGroup };

export type ToggleButtonGroupProps = Pick<
  ComponentProps<typeof ToggleButtonGroup>,
  | 'children'
  | 'color'
  | 'disabled'
  | 'exclusive'
  | 'fullWidth'
  | 'onChange'
  | 'orientation'
  | 'size'
  | 'value'
>;
