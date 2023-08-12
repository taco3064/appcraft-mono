import IconButton from '@mui/material/IconButton';
import type { ComponentProps } from 'react';

export { IconButton };

export type IconButtonProps = Pick<
  ComponentProps<typeof IconButton>,
  'children' | 'color' | 'disabled' | 'edge' | 'size' | 'onClick'
>;
