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
          elevation: 0,
          maxWidth: 'xs',
        } as PaperProps
      }
    />
  ),
  (theme, { anchor }) => ({
    paper: {
      ...(anchor === 'top' && {
        borderRadius: theme.spacing(0, 0, 3, 3),
      }),
      ...(anchor === 'bottom' && {
        borderRadius: theme.spacing(3, 3, 0, 0),
      }),
      ...(anchor === 'left' && {
        borderRadius: theme.spacing(0, 3, 3, 0),
      }),
      ...(anchor === 'right' && {
        borderRadius: theme.spacing(3, 0, 0, 3),
      }),

      '& > *': {
        height: '100%',
      },
    },
  }),
  { name: 'SizedDrawer' }
);
