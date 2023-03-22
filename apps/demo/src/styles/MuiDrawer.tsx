import Container, { ContainerProps } from '@mui/material/Container';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import type { PaperProps } from '@mui/material/Paper';
import { withStyles } from 'tss-react/mui';

interface SizedDrawerProps extends Omit<DrawerProps, 'PaperProps'> {
  maxWidth: ContainerProps['maxWidth'];
}

export const SizedDrawer = withStyles(
  ({ maxWidth, ...props }: SizedDrawerProps) => (
    <Drawer
      {...props}
      PaperProps={
        {
          component: Container,
          disableGutters: true,
          maxWidth: 'xs',
        } as PaperProps
      }
    />
  ),
  (theme) => ({
    paper: {
      '& > *': {
        height: '100%',
      },
    },
  }),
  { name: 'SizedDrawer' }
);
