import AppBar from '@mui/material/AppBar';
import type { ComponentProps } from 'react';

export { AppBar };

export type AppBarProps = Pick<
  ComponentProps<typeof AppBar>,
  'children' | 'color' | 'enableColorOnDark' | 'position'
>;
