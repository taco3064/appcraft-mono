import type { ContainerProps } from '@mui/material/Container';
import type { DrawerProps } from '@mui/material/Drawer';
import type { ReactNode } from 'react';
import type { StyledComponentProps, Theme } from '@mui/material/styles';

export interface SizedDrawerProps extends Omit<DrawerProps, 'PaperProps'> {
  maxWidth: ContainerProps['maxWidth'];

  PaperProps?: Omit<
    DrawerProps['PaperProps'],
    'component' | 'disableGutters' | 'elevation' | 'maxWidth'
  >;
}

export interface ResponsiveDrawerProps
  extends Omit<ContainerProps, 'classes' | 'id' | 'children' | 'content'>,
    StyledComponentProps<'root' | 'paper' | 'content' | 'space'> {
  disablePersistent?: boolean;
  drawer: ReactNode;
  content: ReactNode;
  height?: (theme: Theme) => number | string;
  open: boolean;
  onClose: DrawerProps['onClose'];

  ContentProps?: Omit<ContainerProps, 'children' | 'disableGutters' | 'sx'>;

  DrawerProps: Omit<
    DrawerProps,
    'anchor' | 'maxWidth' | 'variant' | 'open' | 'onClose'
  > & {
    anchor: 'right' | 'left';
    maxWidth: ContainerProps['maxWidth'];
  };
}
