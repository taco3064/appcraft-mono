import Divider from '@mui/material/Divider';
import type { ComponentProps } from 'react';

export { Divider };

export type DividerProps = Pick<
  ComponentProps<typeof Divider>,
  | 'absolute'
  | 'children'
  | 'flexItem'
  | 'light'
  | 'orientation'
  | 'textAlign'
  | 'variant'
>;
