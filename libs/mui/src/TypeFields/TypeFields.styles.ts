import MuiTypography from '@mui/material/Typography';
import { withStyles } from 'tss-react/mui';

export const Typography = withStyles(
  MuiTypography,
  (theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
  }),
  { name: 'Typography' }
);
