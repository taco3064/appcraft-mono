import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import LabelIcon from '@mui/icons-material/Label';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';

import * as Hooks from '../../hooks';
import { ConstructSelection } from '../common';
import { IconTipButton, TypeItemAction } from '../../styles';
import { TypeItemDisplay, TypeItemDisplayProps } from '../TypeItemDisplay';
import { TypeItemMixed, TypeItemMixedProps } from '../TypeItemMixed';
import { TypeItemPure, TypeItemPureProps } from '../TypeItemPure';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  action,
  collectionType,
  disabled = false,
  options,
  onDelete,
  onRename,
  onSubitemView,
}: Types.TypeItemProps) {
  const ct = Hooks.useFixedT();
  const [naming, setNaming] = useState(false);

  const { category, label, propPath } = Hooks.useTypeItem(
    collectionType,
    options
  );

  const [status, selection] = Hooks.useConstructSelection(
    propPath,
    ({ status, onStatusChange }) => (
      <ConstructSelection status={status} onStatusChange={onStatusChange} />
    )
  );

  const actions =
    !action && !onDelete ? null : (
      <>
        {!naming && options.propName !== '*' && action}

        {onRename && (
          <IconTipButton
            color={naming ? 'primary' : 'default'}
            title={ct('btn-rename-prop')}
            onClick={() => setNaming(true)}
          >
            {naming ? <LabelIcon /> : <LabelOutlinedIcon />}
          </IconTipButton>
        )}

        {!naming && onDelete && (
          <IconTipButton title={ct('btn-remove-prop')} onClick={onDelete}>
            <CloseIcon />
          </IconTipButton>
        )}
      </>
    );

  return (
    <>
      <Collapse in={naming}>
        <ListItem
          component="form"
          onSubmit={(e) => {
            const formdata = new FormData(e.currentTarget);

            e.preventDefault();
            setNaming(false);
            onRename?.(formdata.get('propName') as string);
          }}
        >
          <ListItemIcon />

          <ListItemText
            disableTypography
            primary={
              naming && (
                <TextField
                  autoFocus
                  fullWidth
                  required
                  size="small"
                  variant="outlined"
                  name="propName"
                  label={ct('lbl-prop-naming', { name: options.propName })}
                  defaultValue={options.propName}
                />
              )
            }
          />

          <TypeItemAction onClick={(e) => e.stopPropagation()}>
            <IconTipButton
              title={ct('btn-cancel')}
              onClick={() => setNaming(false)}
            >
              <UndoIcon />
            </IconTipButton>

            <IconTipButton
              type="submit"
              color="primary"
              title={ct('btn-confirm')}
            >
              <CheckIcon />
            </IconTipButton>
          </TypeItemAction>
        </ListItem>
      </Collapse>

      <Collapse in={!naming}>
        <>
          {category === 'Display' && (
            <TypeItemDisplay
              action={actions}
              disabled={disabled || Boolean(status)}
              label={label}
              propPath={propPath}
              options={options as TypeItemDisplayProps['options']}
              selection={selection}
              onClick={onSubitemView}
            />
          )}

          {category === 'Pure' && (
            <TypeItemPure
              action={actions}
              disabled={disabled || Boolean(status)}
              label={label}
              propPath={propPath}
              options={options as TypeItemPureProps['options']}
              selection={selection}
            />
          )}

          {category === 'Mixed' && (
            <TypeItemMixed
              action={actions}
              disabled={disabled || Boolean(status) || options.propName === '*'}
              label={label}
              propPath={propPath}
              options={options as TypeItemMixedProps['options']}
              selection={selection}
              renderMatchedField={(matched, matchedAction) => (
                <TypeItem
                  {...{ collectionType, onDelete, onSubitemView }}
                  disabled={disabled || Boolean(status)}
                  options={matched}
                  action={matchedAction}
                />
              )}
            />
          )}
        </>
      </Collapse>
    </>
  );
}
