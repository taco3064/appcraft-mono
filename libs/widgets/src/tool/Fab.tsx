import Fab from '@mui/material/Fab';
import type { ComponentProps } from 'react';

export { Fab };

export type FabProps = Pick<
  ComponentProps<typeof Fab>,
  'children' | 'color' | 'disabled' | 'href' | 'variant' | 'onClick'
>;
