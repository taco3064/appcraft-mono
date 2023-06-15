import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import type { ListPlaceholderProps } from './ListPlaceholder.types';

export default function ListPlaceholder({
  action,
  message,
}: ListPlaceholderProps) {
  return (
    <ListItem>
      <ListItemText
        disableTypography
        primary={
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ marginTop: (theme) => theme.spacing(2) }}
          >
            {message}
          </Typography>
        }
        secondary={action}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: (theme) => theme.spacing(3),
        }}
      />
    </ListItem>
  );
}
