import Container, { ContainerProps } from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { withStyles } from 'tss-react/mui';

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

interface PageContainerProps extends Omit<ContainerProps, 'disableGutters'> {
  ContentProps?: Omit<ContainerProps, 'role' | 'children' | 'component'>;
  action?: ReactNode;
  title: string;
}

export const PageContainer = withStyles(
  ({ ContentProps, title, action, children, ...props }: PageContainerProps) => (
    <Container {...props} disableGutters>
      <Toolbar disableGutters variant="dense">
        <Typography
          fontWeight="bolder"
          variant="h5"
          color="secondary"
          style={{ marginRight: 'auto' }}
        >
          {title}
        </Typography>

        {action}
      </Toolbar>

      <Divider sx={(theme) => ({ marginBottom: theme.spacing(2) })} />

      <Paper
        role="contentinfo"
        elevation={0}
        component={Container}
        {...ContentProps}
      >
        {children}
      </Paper>
    </Container>
  ),
  (theme, { ContentProps }) => ({
    root: {
      '& > [role=contentinfo]': {
        background: ContentProps?.disableGutters ? 'transparent' : null,
        borderRadius: theme.spacing(1),
        paddingTop: theme.spacing(ContentProps?.disableGutters ? 0 : 2),
        paddingBottom: theme.spacing(ContentProps?.disableGutters ? 0 : 2),
      },
    },
  }),
  { name: 'PageContainer' }
);
