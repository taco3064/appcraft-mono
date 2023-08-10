import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import _get from 'lodash/get';
import type * as Appcraft from '@appcraft/types';

import * as Style from '../../styles';
import { useStateGenerator } from '../../hooks';
import type * as Types from './WidgetState.types';

const STATE_EXCLUDE: RegExp[] = [/^mixedTypes$/];
const TABS: Appcraft.StateCategory[] = ['props', 'nodes', 'todos'];

export default function WidgetState({
  ct,
  typeFile = './node_modules/@appcraft/types/src/widgets/state.types.d.ts',
  values,
  renderEditor,
  onBack,
  onChange,
  onFetchDefinition,
  onStateEdit,
}: Types.WidgetStateProps) {
  const [active, setActive] = React.useState<Appcraft.StateCategory>(TABS[0]);

  const [editing, handleState] = useStateGenerator(
    typeFile,
    active,
    values,
    onChange
  );

  const states: [string, Appcraft.WidgetState][] = Object.entries(
    _get(values, ['state', active]) || {}
  );

  const handleEditToggle: Types.EditToggleHandler = (e) => {
    if (e) {
      handleState.edit(e.path);
      onStateEdit(e);
    } else {
      handleState.clear();
      onStateEdit();
    }
  };

  return (
    <>
      <Style.WidgetAppBar
        BackButtonProps={{
          icon: <ArrowBackIcon />,
          text: ct('btn-back'),
          onClick: onBack,
        }}
      >
        <Style.AutoBreakTypography
          primary={ct('btn-state')}
          secondary={_get(values, [
            'state',
            active,
            editing?.path as string,
            'alias',
          ])}
        />
      </Style.WidgetAppBar>

      <Toolbar disableGutters variant="dense">
        <Tabs
          variant="fullWidth"
          value={active}
          sx={{ flexGrow: 1 }}
          onChange={(_e, newActive) => {
            setActive(newActive);
            handleEditToggle();
          }}
        >
          {TABS.map((value) => (
            <Tab key={value} label={ct(`ttl-state-${value}`)} value={value} />
          ))}
        </Tabs>

        <IconButton
          color="primary"
          disabled={!editing}
          onClick={() => handleEditToggle()}
          sx={{ marginRight: (theme) => theme.spacing(2) }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>

      {editing ? (
        renderEditor({
          exclude: STATE_EXCLUDE,
          fixedT: ct,
          values: editing.config,
          onChange: handleState.change,
          onFetchDefinition,
        })
      ) : (
        <List disablePadding style={{ background: 'inherit' }}>
          {!states.length ? (
            <Style.ListPlaceholder message={ct('msg-no-state')} />
          ) : (
            states.map(([path, { alias, description }]) => (
              <ListItemButton
                key={path}
                onClick={() => handleEditToggle({ category: active, path })}
              >
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
    </>
  );
}
