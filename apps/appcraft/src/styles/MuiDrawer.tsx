import Container, { ContainerProps } from '@mui/material/Container';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { withStyles } from 'tss-react/mui';
import type { PaperProps } from '@mui/material/Paper';

export const SizedDrawer = (() => {
  interface SizedDrawerProps extends Omit<DrawerProps, 'PaperProps'> {
    maxWidth: ContainerProps['maxWidth'];

    PaperProps?: Omit<
      DrawerProps['PaperProps'],
      'component' | 'disableGutters' | 'elevation' | 'maxWidth'
    >;
  }

  return withStyles(
    ({ PaperProps, maxWidth, ...props }: SizedDrawerProps) => (
      <Drawer
        {...props}
        PaperProps={
          {
            ...PaperProps,
            component: Container,
            disableGutters: true,
            elevation: 0,
            maxWidth,
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
      },
    }),
    { name: 'SizedDrawer' }
  );
})();
