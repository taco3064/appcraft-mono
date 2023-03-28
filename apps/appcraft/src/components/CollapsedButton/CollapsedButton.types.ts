import type { CollapseProps } from '@mui/material/Collapse';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { ReactNode } from 'react';

export interface CollapsedButtonProps
  extends Omit<IconButtonProps, 'children'> {
  CollapseProps?: Omit<CollapseProps, 'children' | 'in' | 'orientation'>;
  children: ReactNode;
  icon: ReactNode;
}
