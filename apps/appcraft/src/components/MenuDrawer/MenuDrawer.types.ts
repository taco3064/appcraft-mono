import type { DrawerProps } from '@mui/material/Drawer';

export type MenuDrawerProps = Omit<
  DrawerProps,
  'PaperProps' | 'anchor' | 'children'
>;
