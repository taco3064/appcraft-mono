import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { withStyles } from 'tss-react/mui';
import type { ReactNode } from 'react';
import type { StyledComponentProps } from '@mui/material/styles';

export const ListPlaceholder = (() => {
  interface ListPlaceholderProps
    extends StyledComponentProps<'text' | 'primary'> {
    message: string;
    action?: ReactNode;
  }

  return withStyles(
    ({ action, classes, message }: ListPlaceholderProps) => (
      <ListItem>
        <ListItemText
          disableTypography
          className={classes?.text}
          primary={
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              className={classes?.primary}
            >
              {message}
            </Typography>
          }
          secondary={action}
        />
      </ListItem>
    ),
    (theme) => ({
      text: {
        display: 'flex',
        flexDirection: 'column' as never,
        alignItems: 'center',
        gap: theme.spacing(3),
      },
      primary: {
        marginTop: theme.spacing(2),
      },
    }),
    { name: 'ListPlaceholder' }
  );
})();
