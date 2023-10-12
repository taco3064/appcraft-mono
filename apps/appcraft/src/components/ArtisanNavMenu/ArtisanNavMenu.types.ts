import type { DrawerProps } from '@mui/material/Drawer';

export type ArtisanNavMenuProps = Omit<
  DrawerProps,
  'PaperProps' | 'anchor' | 'children'
>;
