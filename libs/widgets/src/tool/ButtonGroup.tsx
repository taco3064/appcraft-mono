import ButtonGroup from '@mui/material/ButtonGroup';
import type { ComponentProps } from 'react';

export { ButtonGroup };

export type ButtonGroupProps = Pick<
  ComponentProps<typeof ButtonGroup>,
  | 'children'
  | 'color'
  | 'disabled'
  | 'fullWidth'
  | 'orientation'
  | 'size'
  | 'variant'
>;
