import Toolbar from '@mui/material/Toolbar';
import type { ComponentProps } from 'react';

export { Toolbar };

export type ToolbarProps = Pick<
  ComponentProps<typeof Toolbar>,
  'children' | 'disableGutters' | 'variant'
>;
