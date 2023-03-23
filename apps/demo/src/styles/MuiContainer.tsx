import Container, { ContainerProps } from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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

interface PageContainerProps extends ContainerProps {
  ContentProps?: Omit<ContainerProps, 'role'>;
  title: string;
}

export const PageContainer = withStyles(
  ({ ContentProps, title, children, ...props }: PageContainerProps) => (
    <Container {...props}>
      <Typography role="heading" paragraph variant="h4" color="secondary">
        {title}
      </Typography>

      <Paper role="contentinfo" elevation={0.1} {...ContentProps}>
        {children}
      </Paper>
    </Container>
  ),
  (theme) => ({
    root: {
      '& > [role=heading]': {
        fontWeight: 'bolder',
      },
      '& > [role=contentinfo]': {
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1.5, 3, 3, 3),
      },
    },
  }),
  { name: 'PageContainer' }
);
