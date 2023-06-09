import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

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
  const [building, setBuilding] = useState(false);

  return (
    <>
      <WidgetAddDialog
        {...{ renderWidgetTypeSelection }}
        open={building}
        onClose={() => setBuilding(false)}
        onConfirm={(e) => onWidgetChange({ ...widget, ...e })}
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
              <ListItemText
                primary={widget.type}
                secondary={widget.description}
              />

              <ListItemSecondaryAction onClick={(e) => e.stopPropagation()}>
                <Tooltip title={ct('btn-remove-widget')}>
                  <IconButton onClick={() => onWidgetChange(null)}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
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
