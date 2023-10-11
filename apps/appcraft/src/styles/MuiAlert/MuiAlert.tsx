import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiAlert.types';

export const ArcAlert = withStyles(
  ({ action, children, icon, severity, ...props }: Types.ArcAlertProps) => (
    <Dialog {...props} fullWidth maxWidth="xs">
      <Alert {...{ action, icon, severity }} variant="outlined">
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
        color: theme.palette.text.primary,
      },
    },
  }),
  { name: 'ArcAlert' }
);

export const MaxWidthAlert = withStyles(
  forwardRef<HTMLDivElement, Types.MaxWidthAlertProps>(function MaxWidthAlert(
    { action, children, maxWidth, msgVariant, ...props },
    ref
  ) {
    return (
      <Container ref={ref} maxWidth={maxWidth}>
        <Alert {...props}>
          <Typography
            paragraph={Boolean(action)}
            variant={msgVariant}
            color="inherit"
          >
            {children}
          </Typography>

          {action}
        </Alert>
      </Container>
    );
  }),
  (theme) => ({
    root: {
      borderRadius: theme.spacing(2),
      margin: theme.spacing(2, 0),
    },
  }),
  { name: 'MaxWidthAlert' }
);
