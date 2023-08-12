import ListSubheader from '@mui/material/ListSubheader';
import type { ComponentProps } from 'react';

export { ListSubheader };

export type ListSubheaderProps = Pick<
  ComponentProps<typeof ListSubheader>,
  'children' | 'color' | 'disableGutters' | 'disableSticky' | 'inset'
>;
