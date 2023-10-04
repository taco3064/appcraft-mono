import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import cx from 'clsx';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useEffect, useRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiContainer.types';

//* Variables
const SCREEN_SIZE: Types.BreakpointConfig = {
  xs: 190,
  sm: 140,
  md: 68,
  lg: 56,
  xl: 52,
};

const CONTAINER_WIDTH: Types.BreakpointConfig = {
  xs: 444,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

//* Style Components
export const FullscreenContainer = withStyles(
  Container,
  () => ({
    root: {
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
    },
  }),
  { name: 'FullscreenContainer' }
);

export const MainContainer = withStyles(
  Container,
  (theme) => ({
    root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  }),
  { name: 'MainContainer' }
);

export const PageContainer = withStyles(
  ({
    ContentProps,
    action,
    children,
    primary,
    secondary,
    classes: {
      content: contentClassName,
      title: titleClassName,
      toolbar: toolbarClassName,
      ...containerClasses
    },
    ...props
  }: Types.PageContainerProps) => (
    <Slide in direction="up">
      <Container {...props} disableGutters classes={containerClasses}>
        <Toolbar disableGutters variant="dense" className={toolbarClassName}>
          <CraftsmanStyle.AutoBreakTypography
            {...{ primary, secondary }}
            classes={{ root: titleClassName }}
            primaryTypographyProps={{
              variant: 'h5',
              color: 'secondary',
              whiteSpace: 'nowrap',
            }}
            secondaryTypographyProps={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          />

          {action}
        </Toolbar>

        <Paper
          elevation={0}
          component={Container}
          maxWidth={false}
          {...ContentProps}
          className={cx(contentClassName, ContentProps?.className)}
        >
          {children}
        </Paper>
      </Container>
    </Slide>
  ),
  (theme, { ContentProps }) => ({
    content: {
      background: ContentProps?.disableGutters ? 'transparent' : null,
      borderRadius: theme.spacing(2),
      paddingTop: theme.spacing(ContentProps?.disableGutters ? 0 : 2),
      paddingBottom: theme.spacing(ContentProps?.disableGutters ? 0 : 2),
    },
    title: {
      marginRight: 'auto',

      [theme.breakpoints.only('xs')]: {
        fontSize: theme.typography.h6.fontSize,
      },
    },
    toolbar: {
      position: 'sticky' as never,
      background: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
      top: theme.spacing(9),
      zIndex: theme.zIndex.appBar,
      userSelect: 'none' as never,
    },
  }),
  { name: 'PageContainer' }
);

export const ScreenSimulator = withStyles(
  ({ children, classes, maxWidth }: Types.ScreenSimulatorProps) => {
    const screenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const { current: el } = screenRef;

      if (el) {
        const handleResize = () => {
          const borderEl = el.querySelector<HTMLDivElement>(
            ':scope > [data-role="border"]'
          );

          const viewportEl = borderEl.querySelector<HTMLDivElement>(
            ':scope > [data-role="viewport"]'
          );

          const scaleEl = viewportEl.querySelector<HTMLDivElement>(
            ':scope > [data-role="scale"]'
          );

          const { [maxWidth]: w } = CONTAINER_WIDTH;
          const { width: baseWidth } = viewportEl.getBoundingClientRect();
          const scale = baseWidth / w;

          //* 框線樣式
          viewportEl.style.borderRadius = `${8 * scale}px`;
          borderEl.style.borderRadius = `${12 * scale}px`;
          borderEl.style.padding = `${12 * scale}px`;
          borderEl.style.paddingBottom = `${48 * scale}px`;

          const { width, height, x, y } = viewportEl.getBoundingClientRect();

          scaleEl.style.width = `${width * (1 / scale)}px`;
          scaleEl.style.height = `${height * (1 / scale)}px`;
          scaleEl.style.transform = `scale(${scale})`;
          scaleEl.style.top = '0px';
          scaleEl.style.left = '0px';

          const scaleRect = scaleEl.getBoundingClientRect();

          scaleEl.style.top = `${y - scaleRect.y}px`;
          scaleEl.style.left = `${x - scaleRect.x}px`;
        };

        handleResize();
        global.window?.addEventListener('resize', handleResize);

        return () => {
          global.window?.removeEventListener('resize', handleResize);
        };
      }
    }, [maxWidth]);

    return (
      <Container ref={screenRef} className={classes.root} maxWidth={false}>
        <Container
          data-role="border"
          className={classes.border}
          maxWidth={maxWidth}
        >
          <Paper data-role="viewport" className={classes.viewport}>
            <Container
              disableGutters
              data-role="scale"
              maxWidth={false}
              className={classes.scale}
            >
              {children}
            </Container>
          </Paper>
        </Container>
      </Container>
    );
  },
  (theme, { maxWidth, minHeight }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: minHeight?.(theme),
      margin: theme.spacing(2, 0),
    },
    border: {
      display: 'flex',
      justifyContent: 'center',
      boxShadow: theme.shadows[10],
      borderRadius: theme.spacing(1.5),
      background: `linear-gradient(135deg, #0B0033, #040014)`,
    },
    viewport: {
      position: 'relative' as never,
      display: 'grid',
      width: '100%',
      height: '100%',
      borderRadius: theme.spacing(1),
      paddingTop: `${SCREEN_SIZE[maxWidth]}%`,
      overflow: 'hidden',
    },
    scale: {
      position: 'absolute' as never,
      display: 'flex',
      flexDirection: 'column' as never,
      alignItems: 'center',
      borderRadius: theme.spacing(1, 1, 0.5, 0.5),
      top: 0,
      left: 0,
      zIndex: 0,
      overflow: 'hidden auto !important',
    },
  }),
  { name: 'ScreenSimulator' }
);
