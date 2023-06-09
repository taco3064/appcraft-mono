import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useFixedT } from '../../contexts';
import type { ActionElement } from '../CraftedTypeEditor';
import type { WidgetStructureProps } from './WidgetStructure.types';

export default function WidgetStructure<A extends ActionElement = undefined>({
  action,
  fixedT,
  open,
  widget,
  renderWidgetTypeSelection,
  onWidgetSelect,
}: WidgetStructureProps<A>) {
  const ct = useFixedT(fixedT);

  return (
    <>
      {action && (
        <>
          {action}
          <Divider />
        </>
      )}

      {/* <Collapse in={open}>
        <Divider />

        <Toolbar
          variant="regular"
          sx={(theme) => ({
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            flexWrap: 'wrap',
          })}
        >
          {widgetTypeSelection}

          <TextField
            fullWidth
            size="small"
            margin="dense"
            variant="outlined"
            label={ct('lbl-description')}
            defaultValue={widget.description || ''}
            onChange={(e) => onWidgetChange('description', e.target.value)}
          />
        </Toolbar>
      </Collapse> */}

      <Collapse in={open}>
        <List>
          {!widget && (
            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'h6',
                  color: 'text.secondary',
                  align: 'center',
                  sx: { marginTop: (theme) => theme.spacing(2) },
                }}
                primary={ct('msg-no-widget')}
              />
            </ListItem>
          )}
        </List>
      </Collapse>
    </>
  );
}
