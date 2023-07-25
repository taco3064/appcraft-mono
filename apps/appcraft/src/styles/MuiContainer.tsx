import Container, { ContainerProps } from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { Style } from '@appcraft/mui';
import { withStyles } from 'tss-react/mui';

import { useWidth } from '~appcraft/hooks';

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

export const PageContainer = (() => {
  interface PageContainerProps
    extends Omit<ContainerProps, 'classes' | 'disableGutters' | 'title'> {
    ContentProps?: Omit<ContainerProps, 'role' | 'children' | 'component'>;
    action?: ReactNode;
    primary: string;
    secondary?: string;

    classes?: ContainerProps['classes'] & {
      title?: string;
    };
  }

  return withStyles(
    ({
      ContentProps,
      classes: { title: titleClassName, ...containerClasses },
      action,
      children,
      primary,
      secondary,
      ...props
    }: PageContainerProps) => (
      <Container {...props} disableGutters classes={containerClasses}>
        <Toolbar role="toolbar" disableGutters variant="dense">
          <Style.AutoBreakTypography
            {...{ primary, secondary }}
            classes={{ root: titleClassName }}
            primaryTypographyProps={{
              variant: 'h5',
              color: 'secondary',
            }}
          />

          {action}
        </Toolbar>

        <Paper
          role="contentinfo"
          elevation={0}
          component={Container}
          maxWidth={false}
          {...ContentProps}
        >
          {children}
        </Paper>
      </Container>
    ),
    (theme, { ContentProps }) => ({
      root: {
        '& > [role=toolbar]': {
          position: 'sticky',
          background: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
          top: theme.spacing(9),
          zIndex: theme.zIndex.appBar,
        },
        '& > [role=contentinfo]': {
          background: ContentProps?.disableGutters ? 'transparent' : null,
          borderRadius: theme.spacing(2),
          paddingTop: theme.spacing(ContentProps?.disableGutters ? 0 : 2),
          paddingBottom: theme.spacing(ContentProps?.disableGutters ? 0 : 2),
        },
      },
      title: {
        marginRight: 'auto',

        [theme.breakpoints.only('xs')]: {
          fontSize: theme.typography.h6.fontSize,
          whiteSpace: 'pre-line' as never,
        },
      },
    }),
    { name: 'PageContainer' }
  );
})();
