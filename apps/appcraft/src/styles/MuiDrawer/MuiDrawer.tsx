import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import { withStyles } from 'tss-react/mui';
import type { PaperProps } from '@mui/material/Paper';

import { useWidth } from '~appcraft/hooks';
import type * as Types from './MuiDrawer.types';

export const SizedDrawer = withStyles(
  ({ PaperProps, maxWidth, ...props }: Types.SizedDrawerProps) => (
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

export const ResponsiveDrawer = withStyles(
  ({
    ContentProps,
    DrawerProps,
    classes,
    content,
    drawer,
    height,
    open,
    onClose,
    ...props
  }: Types.ResponsiveDrawerProps) => {
    const width = useWidth();
    const isTemporary = /^(xs|sm)$/.test(width);

    return (
      <Container {...props} className={classes.root}>
        <SizedDrawer
          {...DrawerProps}
          {...(isTemporary && { onClose })}
          variant={isTemporary ? 'temporary' : 'persistent'}
          open={open}
          PaperProps={{ className: classes.paper }}
        >
          {drawer}
        </SizedDrawer>

        <Container
          {...ContentProps}
          disableGutters
          className={classes.content}
          maxWidth={false}
        >
          {content}
        </Container>

        <Container
          disableGutters
          className={classes.space}
          maxWidth={DrawerProps.maxWidth}
        />
      </Container>
    );
  },
  (theme, { DrawerProps, height, open }) => ({
    root: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: DrawerProps.anchor === 'right' ? 'row' : 'row-reverse',
      height: height?.(theme) || '100%',
      borderRadius: `${theme.spacing(2)} !important`,
      gap: theme.spacing(1.5),
      overflowX: 'hidden',
    },
    paper: {
      position: 'absolute' as never,
      height: '100%',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: `${theme.spacing(2)} !important`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration:
          theme.transitions.duration[open ? 'enteringScreen' : 'leavingScreen'],
      }),
    },
    content: {
      display: 'block',
      flexGrow: 1,
      width: 'auto !important',
      borderRadius: `${theme.spacing(2)} !important`,
      overflow: 'hidden auto',
    },
    space: {
      ...(!open && {
        display: 'none !important',
      }),
      [theme.breakpoints.down('md')]: {
        display: 'none !important',
      },
    },
  }),
  { name: 'ResponsiveDrawer' }
);
