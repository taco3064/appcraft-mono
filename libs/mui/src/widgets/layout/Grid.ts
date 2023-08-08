import Grid from '@mui/material/Grid';
import type { ComponentProps } from 'react';

export { Grid };

export type GridProps = Pick<
  ComponentProps<typeof Grid>,
  | 'children'
  | 'columns'
  | 'columnGap'
  | 'columnSpacing'
  | 'container'
  | 'direction'
  | 'item'
  | 'justifyContent'
  | 'alignItems'
  | 'rowGap'
  | 'rowSpacing'
  | 'spacing'
  | 'wrap'
  | 'zeroMinWidth'
  | 'xl'
  | 'lg'
  | 'md'
  | 'sm'
  | 'xs'
>;
