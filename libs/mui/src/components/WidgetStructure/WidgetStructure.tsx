import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import type { NodeWidget } from '@appcraft/types';

import { NoWidgetItem } from '../common';
import { WidgetAddDialog } from '../WidgetAddDialog';
import { useFixedT } from '../../contexts';
import type { ActionElement } from '../CraftedTypeEditor';
import type { WidgetStructureProps } from './WidgetStructure.types';

export default function WidgetStructure<A extends ActionElement = undefined>({
  action,
  fixedT,
  open = true,
  renderWidgetTypeSelection,
  widget,
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
        onConfirm={(e) => onWidgetChange({ ...widget, ...e } as NodeWidget)}
      />

      <Collapse in={open}>
        {action && (
          <>
            {action}
            <Divider />
          </>
        )}

        <List>
          {!widget ? (
            <NoWidgetItem fixedT={fixedT} onAdd={() => setBuilding(true)} />
          ) : (
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
          )}
        </List>
      </Collapse>
    </>
  );
}
