import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { useFixedT } from '../../../contexts';
import type { NoWidgetItemProps } from './NoWidgetItem.types';

export default function NoWidgetItem({ fixedT, onAdd }: NoWidgetItemProps) {
  const ct = useFixedT(fixedT);

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
            {ct('msg-no-widget')}
          </Typography>
        }
        secondary={
          <Button
            color="primary"
            size="large"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            {ct('btn-new-widget')}
          </Button>
        }
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
