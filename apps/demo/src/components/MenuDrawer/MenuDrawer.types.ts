import type { DrawerProps } from '@mui/material/Drawer';

export interface MenuDrawerProps
  extends Omit<DrawerProps, 'PaperProps' | 'anchor' | 'children'> {}
