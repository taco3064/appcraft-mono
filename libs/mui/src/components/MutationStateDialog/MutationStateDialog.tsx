import * as React from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import _get from 'lodash/get';
import type * as Appcraft from '@appcraft/types';

import * as Style from '../../styles';
import { useStateGenerator } from '../../hooks';
import type * as Types from './MutationStateDialog.types';

const STATE_EXCLUDE: RegExp[] = [/^mixedTypes$/];
const TABS: Appcraft.StateCategory[] = ['props', 'nodes', 'todos'];

export default function MutationStateDialog({
  ct,
  open,
  typeFile = './node_modules/@appcraft/types/src/widgets/state.types.d.ts',
  values,
  renderEditor,
  onClose,
  onConfirm,
  onFetchDefinition,
}: Types.MutationStateDialogProps) {
  const [active, setActive] = React.useState<Appcraft.StateCategory>(TABS[0]);

  const [{ editing, stateValues }, handleState] = useStateGenerator(
    typeFile,
    active,
    open ? values?.state : undefined
  );

  const states: [string, Appcraft.WidgetState][] = Object.entries(
    _get(stateValues, [active]) || {}
  );

  const handleClose: typeof onClose = (...e) => {
    onClose(...e);
    handleState.clear();
  };

  return (
    <Style.FlexDialog
      {...{ open, onClose }}
      disableContentJustifyCenter
      fullWidth
      maxWidth="xs"
      direction="column"
      onClose={handleClose}
      action={
        <>
          <Button onClick={(e) => handleClose(e, 'escapeKeyDown')}>
            {ct('btn-cancel')}
          </Button>

          <Button
            color="primary"
            onClick={(e) => {
              handleClose(e, 'escapeKeyDown');
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
          exclude: STATE_EXCLUDE,
          fixedT: ct,
          values: editing.config,
          onChange: handleState.change,
          onFetchDefinition,

          HeaderProps: {
            primary: ct(`ttl-state-${active}`),
            secondary: editing.path,
            onBack: () => handleState.clear(),
            sx: {
              borderRadius: (theme) => theme.spacing(3),
            },
          },
        })
      ) : (
        <List disablePadding style={{ background: 'inherit' }}>
          {!states.length ? (
            <Style.ListPlaceholder message={ct('msg-no-state')} />
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

                <Style.TypeItemAction>
                  <Style.IconTipButton
                    title={ct('btn-remove-prop')}
                    onClick={() => handleState.remove(path)}
                  >
                    <CloseIcon />
                  </Style.IconTipButton>
                </Style.TypeItemAction>
              </ListItemButton>
            ))
          )}
        </List>
      )}
    </Style.FlexDialog>
  );
}
