import Toolbar from '@mui/material/Toolbar';
import { withStyles } from 'tss-react/mui';

export const GapToolbar = withStyles(
  Toolbar,
  (theme) => ({ root: { gap: theme.spacing(1) } }),
  { name: 'GapToolbar' }
);
