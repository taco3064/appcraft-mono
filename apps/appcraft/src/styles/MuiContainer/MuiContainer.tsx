import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import cx from 'clsx';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiContainer.types';

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
