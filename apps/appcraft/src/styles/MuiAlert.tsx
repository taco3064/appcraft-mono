import Alert, { AlertProps } from '@mui/material/Alert';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { withStyles } from 'tss-react/mui';

export const ArcAlert = (() => {
  type ArcAlertProps = Omit<
    DialogProps,
    'fullWidth' | 'maxWidth' | 'PaperProps'
  > &
    Pick<AlertProps, 'severity' | 'icon' | 'action'>;

  return withStyles(
    ({ action, children, icon, severity, ...props }: ArcAlertProps) => (
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
})();
