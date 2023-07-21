import Container, { ContainerProps } from '@mui/material/Container';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { withStyles } from 'tss-react/mui';
import type { PaperProps } from '@mui/material/Paper';
import type { ReactNode } from 'react';
import type { StyledComponentProps, Theme } from '@mui/material/styles';

import { useWidth } from '~appcraft/hooks';

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

export const PersistentDrawerContent = (() => {
  interface PersistentDrawerContentProps
    extends Omit<ContainerProps, 'classes' | 'id' | 'children' | 'content'>,
      StyledComponentProps<'root' | 'paper' | 'content' | 'space'> {
    drawer: ReactNode;
    content: ReactNode;
    height?: (theme: Theme) => number | string;
    open: boolean;

    ContentProps?: Omit<ContainerProps, 'children' | 'disableGutters' | 'sx'>;

    DrawerProps: {
      anchor: 'right' | 'left';
      maxWidth: ContainerProps['maxWidth'];
    };
  }

  return withStyles(
    ({
      ContentProps,
      DrawerProps,
      classes,
      content,
      drawer,
      height,
      open,
      ...props
    }: PersistentDrawerContentProps) => {
      const width = useWidth();

      return (
        <Container {...props} className={classes.root}>
          <SizedDrawer
            {...DrawerProps}
            variant={/^(xs|sm)$/.test(width) ? 'temporary' : 'persistent'}
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
            theme.transitions.duration[
              open ? 'enteringScreen' : 'leavingScreen'
            ],
        }),
      },
      content: {
        display: 'flex',
        flexDirection: 'column' as never,
        flexGrow: 1,
        width: 'auto !important',
        borderRadius: `${theme.spacing(2)} !important`,
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
    { name: 'PersistentDrawerContent' }
  );
})();
