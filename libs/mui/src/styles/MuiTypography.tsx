import Typography from '@mui/material/Typography';
import { withStyles } from 'tss-react/mui';

export const BreadcrumbText = withStyles(
  Typography,
  (theme) => ({
    root: {
      color: theme.palette.secondary.main,
      fontSize: theme.typography.subtitle1.fontSize,
    },
  }),
  { name: 'BreadcrumbText' }
);

export const GapTypography = withStyles(
  Typography,
  (theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      height: theme.spacing(5),
    },
  }),
  { name: 'GapTypography' }
);
