import Typography from '@mui/material/Typography';
import { withStyles } from 'tss-react/mui';

export const GapTypography = withStyles(
  Typography,
  (theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
  }),
  { name: 'GapTypography' }
);
