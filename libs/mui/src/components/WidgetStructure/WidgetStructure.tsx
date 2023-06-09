import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState, useTransition } from 'react';

import { WidgetAddDialog } from '../WidgetAddDialog';
import { useFixedT } from '../../contexts';
import type { ActionElement } from '../CraftedTypeEditor';
import type { WidgetStructureProps } from './WidgetStructure.types';

export default function WidgetStructure<A extends ActionElement = undefined>({
  action,
  fixedT,
  open = true,
  widget,
  renderWidgetTypeSelection,
  onWidgetChange,
  onWidgetSelect,
}: WidgetStructureProps<A>) {
  const ct = useFixedT(fixedT);
  const [, setTransition] = useTransition();
  const [building, setBuilding] = useState(false);

  return (
    <>
      <WidgetAddDialog
        {...{ renderWidgetTypeSelection }}
        open={building}
        onClose={() => setBuilding(false)}
        onConfirm={(e) =>
          setTransition(() =>
            Object.entries(e).forEach(([field, value]) =>
              onWidgetChange(field as keyof typeof e, value)
            )
          )
        }
      />

      <Collapse in={open}>
        {action && (
          <>
            {action}
            <Divider />
          </>
        )}

        <List>
          {widget ? (
            <ListItemButton onClick={() => onWidgetSelect(widget)}>
              <ListItemText primary={widget.description || widget.type} />
            </ListItemButton>
          ) : (
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
                    onClick={() => setBuilding(true)}
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
          )}
        </List>
      </Collapse>
    </>
  );
}
