import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiAlert.types';

export const ArcAlert = withStyles(
  ({ action, children, icon, severity, ...props }: Types.ArcAlertProps) => (
    <Dialog {...props} fullWidth maxWidth="xs">
      <Alert {...{ action, icon, severity }} variant="filled">
        <Typography variant="h6" color="inherit">
          {children}
        </Typography>
      </Alert>
    </Dialog>
  ),
  (theme) => ({
    paper: {
      borderRadius: theme.spacing(2),

      '& > [role=alert]': {
        borderRadius: theme.spacing(2),
        alignItems: 'center',
      },
    },
  }),
  { name: 'ArcAlert' }
);
