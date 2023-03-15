import Container from '@mui/material/Container';
import { withStyles } from 'tss-react/mui';

export const MainContainer = withStyles(
  Container,
  (theme) => ({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  }),
  { name: 'MainContainer' }
);
