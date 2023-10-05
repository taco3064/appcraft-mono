import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import cx from 'clsx';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  ({ classes, maxWidth, render }: Types.ScreenSimulatorProps) => {
    const [scale, setScale] = useState<number>();
    const screenRef = useRef<HTMLDivElement>();

    const resizeObserver = useMemo(
      () =>
        new ResizeObserver((entries) => {
          for (const entry of entries) {
            const device =
              entry.target.querySelector<HTMLDivElement>(':scope > div');

            const viewport =
              device.querySelector<HTMLDivElement>(':scope > div');

            const container = viewport.querySelector<SVGElement>(
              ':scope > svg > foreignObject'
            );

            const { [maxWidth]: w } = CONTAINER_WIDTH;
            const { width: base } = viewport.getBoundingClientRect();
            const scale = base / w;

            //* 框線樣式
            viewport.style.borderRadius = `${8 * scale}px`;
            device.style.borderRadius = `${12 * scale}px`;
            device.style.padding = `${12 * scale}px`;
            device.style.paddingBottom = `${48 * scale}px`;

            //* 縮放樣式
            const { width, height } = viewport.getBoundingClientRect();

            container.style.width = `${width * (1 / scale)}px`;
            container.style.height = `${height * (1 / scale)}px`;
            container.style.transform = `scale(${scale})`;

            setScale(scale);
          }
        }),
      [maxWidth]
    );

    useEffect(() => {
      const { current: el } = screenRef;

      if (el) {
        resizeObserver.observe(el);

        return () => resizeObserver.unobserve(el);
      }
    }, [resizeObserver]);

    return (
      <Container ref={screenRef} className={classes.root} maxWidth={false}>
        <Container className={classes.border} maxWidth={maxWidth}>
          <Paper className={classes.viewport}>
            <svg>
              <foreignObject x="0" y="0" className={classes.container}>
                {scale &&
                  render(
                    scale,
                    screenRef.current?.querySelector<SVGSVGElement>(
                      ':scope > div > div > svg > foreignObject'
                    )
                  )}
              </foreignObject>
            </svg>
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

      '& > svg': {
        position: 'absolute' as never,
        borderRadius: 'inherit',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        zIndex: 0,
        width: '100%',
        height: '100%',
      },
    },
    container: {
      overflow: 'hidden auto !important',
      transition: theme.transitions.create(['width', 'height', 'transform']),
    },
  }),
  { name: 'ScreenSimulator' }
);
