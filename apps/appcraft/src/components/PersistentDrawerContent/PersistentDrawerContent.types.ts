import type { ContainerProps } from '@mui/material/Container';
import type { Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface PersistentDrawerContentProps
  extends Omit<ContainerProps, 'id' | 'children' | 'content'> {
  disablePadding?: boolean;
  drawer: ReactNode;
  content: ReactNode;
  height?: (theme: Theme) => number | string;
  open: boolean;

  ContentProps?: Omit<ContainerProps, 'children' | 'sx'>;
  DrawerProps: {
    anchor: 'right' | 'left';
    maxWidth: ContainerProps['maxWidth'];
  };
}
