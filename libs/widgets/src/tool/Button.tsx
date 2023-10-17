import Button from '@mui/material/Button';
import type { ComponentProps } from 'react';

export { Button };

export type ButtonProps = Pick<
  ComponentProps<typeof Button>,
  | 'children'
  | 'color'
  | 'disabled'
  | 'endIcon'
  | 'fullWidth'
  | 'href'
  | 'size'
  | 'startIcon'
  | 'variant'
  | 'onClick'
>;
