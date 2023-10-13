import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import TabScrollButton from '@mui/material/TabScrollButton';
import cx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { withStyles } from 'tss-react/mui';
import type { PaperProps } from '@mui/material/Paper';

import { useWidth } from '~appcraft/hooks';
import type * as Types from './MuiDrawer.types';

export const ExplorerMenuDrawer = withStyles(
  ({ anchor, children, classes, open }: Types.ExplorerMenuDrawerProps) => {
    const [scrollable, setScrollable] = useState(false);
    const listRef = useRef<HTMLUListElement>();

    const resizeObserver = useMemo(
      () =>
        new ResizeObserver((entries) => {
          if (anchor === 'top') {
            for (const entry of entries) {
              const { scrollWidth, clientWidth } = entry.target as HTMLElement;

              setScrollable(scrollWidth > clientWidth);
            }
          }
        }),
      [anchor]
    );

    useEffect(() => {
      const { current: el } = listRef;

      if (el) {
        resizeObserver.observe(el);

        return () => resizeObserver.unobserve(el);
      }
    }, [resizeObserver]);

    return (
      <Drawer
        variant="persistent"
        anchor={anchor}
        classes={{ paper: classes.paper }}
        open={open}
        onClick={(e) => e.stopPropagation()}
      >
        <List
          ref={listRef}
          className={cx(classes.list, { scrollable })}
          disablePadding={anchor === 'top'}
        >
          {anchor === 'top' && scrollable && (
            <TabScrollButton
              role="scrollbar"
              direction="left"
              orientation="horizontal"
              className={classes.scrollLeftButton}
              onClick={() => listRef.current.scrollBy(-100, 0)}
            />
          )}

          {children}

          {anchor === 'top' && scrollable && (
            <TabScrollButton
              role="scrollbar"
              direction="right"
              orientation="horizontal"
              className={classes.scrollRightButton}
              onClick={() => listRef.current.scrollBy(100, 0)}
            />
          )}
        </List>
      </Drawer>
    );
  },
  (theme, { anchor, open }) => ({
    paper: {
      display: 'flex',
      userSelect: 'none' as never,

      ...(anchor === 'top'
        ? { position: 'static' as never }
        : { maxWidth: theme.breakpoints.values.sm * 0.8 }),
    },
    list: {
      display: open ? 'flex' : 'none',
      flexDirection: (anchor === 'top' ? 'row' : 'column') as never,
      flexWrap: 'nowrap' as never,
      background: 'inherit',
      width: '100%',
      maxHeight: '100%',
      overflow: anchor === 'top' ? 'auto hidden' : 'hidden auto',

      transition: theme.transitions.create('display', {
        easing: theme.transitions.easing.sharp,
        duration:
          theme.transitions.duration[open ? 'enteringScreen' : 'leavingScreen'],
      }),
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      ...(anchor === 'top' && {
        '&:not(.scrollable)': {
          paddingLeft: theme.spacing(8),
          paddingRight: theme.spacing(8),
        },
        '& > *:not([role=scrollbar])': {
          minWidth: 'max-content !important',
          maxWidth: 'max-content !important',
        },
        '& > :first-child': {
          marginLeft: 'auto',
        },
        '& > :last-child': {
          marginRight: 'auto',
        },
      }),
    },
    scrollLeftButton: {
      position: 'sticky' as never,
      background: 'inherit',
      borderRadius: '50%',
      left: theme.spacing(1),
      minWidth: theme.spacing(6),
      marginRight: theme.spacing(2),
      zIndex: theme.zIndex.fab,
    },
    scrollRightButton: {
      position: 'sticky' as never,
      background: 'inherit',
      borderRadius: '50%',
      right: theme.spacing(1),
      minWidth: theme.spacing(6),
      marginLeft: theme.spacing(2),
      zIndex: theme.zIndex.fab,
    },
  }),
  { name: 'ExplorerMenuDrawer' }
);

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
    disablePersistent = false,
    drawer,
    height,
    open,
    onClose,
    ...props
  }: Types.ResponsiveDrawerProps) => {
    const width = useWidth();
    const isTemporary = /^(xs|sm)$/.test(width) || disablePersistent;

    return (
      <Container {...props} className={classes.root}>
        <SizedDrawer
          {...DrawerProps}
          {...(isTemporary && { onClose })}
          variant={isTemporary ? 'temporary' : 'persistent'}
          open={open}
          PaperProps={{
            ...DrawerProps?.PaperProps,
            className: cx(classes.paper, DrawerProps?.PaperProps?.className),
          }}
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
  (theme, { DrawerProps, disablePersistent = false, height, open }) => ({
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
      ...(disablePersistent && {
        display: 'none !important',
      }),
    },
  }),
  { name: 'ResponsiveDrawer' }
);
