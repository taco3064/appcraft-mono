import type { ContainerProps } from '@mui/material/Container';
import type { Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface PersistentDrawerContentProps
  extends Omit<ContainerProps, 'id'> {
  disablePadding?: boolean;
  drawer: ReactNode;
  height?: (theme: Theme) => number | string;
  open: boolean;

  ContentProps?: Omit<ContainerProps, 'children'>;
  DrawerProps: {
    anchor: 'right' | 'left';
    maxWidth: ContainerProps['maxWidth'];
  };
}
