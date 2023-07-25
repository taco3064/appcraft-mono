import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import _get from 'lodash/get';
import type * as Appcraft from '@appcraft/types';

import { FlexDialog, ListPlaceholder } from '../../styles';
import { useStateGenerator } from '../../hooks';
import type { StateCategory } from '../../utils';
import type * as Types from './MutationStateDialog.types';

const TABS: StateCategory[] = ['props', 'nodes', 'todos'];

export default function MutationStateDialog({
  ct,
  open,
  typeFile = './node_modules/@appcraft/types/src/widgets/state.types.d.ts',
  values,
  renderEditor,
  onClose,
  onConfirm,
}: Types.MutationStateDialogProps) {
  const [active, setActive] = React.useState<StateCategory>(TABS[0]);

  const [{ editing, stateValues }, handleState] = useStateGenerator(
    typeFile,
    active,
    values.state
  );

  const states: [string, Appcraft.WidgetState][] = Object.entries(
    _get(stateValues, [active]) || {}
  );

  return (
    <FlexDialog
      {...{ open, onClose }}
      disableContentJustifyCenter
      fullWidth
      maxWidth="xs"
      direction="column"
      action={
        <>
          <Button onClick={(e) => onClose(e, 'escapeKeyDown')}>
            {ct('btn-cancel')}
          </Button>

          <Button
            color="primary"
            onClick={(e) => {
              onClose(e, 'escapeKeyDown');
              onConfirm({ ...values, state: stateValues });
            }}
          >
            {ct('btn-confirm')}
          </Button>
        </>
      }
    >
      <Tabs
        variant="fullWidth"
        value={active}
        onChange={(_e, newActive) => {
          setActive(newActive);
          handleState.clear();
        }}
      >
        {TABS.map((value) => (
          <Tab key={value} label={ct(`ttl-state-${value}`)} value={value} />
        ))}
      </Tabs>

      {editing ? (
        renderEditor({
          values: editing.config,
          onChange: handleState.change,
          HeaderProps: {
            primary: ct(`ttl-state-${active}`),
            secondary: editing.path,
            onBack: () => handleState.clear(),
          },
        })
      ) : (
        <List disablePadding style={{ background: 'inherit' }}>
          {!states.length ? (
            <ListPlaceholder message={ct('msg-no-state')} />
          ) : (
            states.map(([path, { alias, description }]) => (
              <ListItemButton key={path} onClick={() => handleState.edit(path)}>
                <ListItemText
                  primary={alias}
                  secondary={description || path}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    color: 'text.secondary',
                  }}
                />
              </ListItemButton>
            ))
          )}
        </List>
      )}
    </FlexDialog>
  );
}
