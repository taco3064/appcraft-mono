import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import LabelIcon from '@mui/icons-material/Label';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { useState } from 'react';

import * as Common from '../common';
import * as Hooks from '../../hooks';
import { IconTipButton } from '../../styles';
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
  const [naming, setNaming] = useState(!options.propName);

  const { category, label, propPath } = Hooks.useTypeItem(
    collectionType,
    options
  );

  const [status, selection] = Hooks.useConstructSelection(
    propPath,
    ({ status, onStatusChange }) => (
      <Common.TypeItemSelection
        status={status}
        onStatusChange={onStatusChange}
      />
    )
  );

  const actions =
    !action && !onDelete ? null : (
      <>
        {!naming && options.propName && action}

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
        <Common.TypeItemNaming
          open={naming}
          propName={options.propName}
          selectable={Boolean(selection)}
          onClose={() => setNaming(false)}
          onRename={onRename}
        />
      </Collapse>

      <Collapse in={!naming}>
        <>
          {category === 'Display' && (
            <Common.TypeItemDisplay
              action={actions}
              disabled={disabled || Boolean(status)}
              label={label}
              propPath={propPath}
              options={options as Common.TypeItemDisplayProps['options']}
              selection={selection}
              onClick={onSubitemView}
            />
          )}

          {category === 'Pure' && (
            <Common.TypeItemPure
              action={actions}
              disabled={disabled || Boolean(status)}
              label={label}
              propPath={propPath}
              options={options as Common.TypeItemPureProps['options']}
              selection={selection}
            />
          )}

          {category === 'Mixed' && (
            <Common.TypeItemMixed
              action={actions}
              disabled={disabled || Boolean(status) || !options.propName}
              label={label}
              propPath={propPath}
              options={options as Common.TypeItemMixedProps['options']}
              selection={selection}
              renderMatchedField={(matched, matchedAction) => (
                <TypeItem
                  {...{ collectionType, onDelete, onSubitemView }}
                  disabled={disabled || Boolean(status)}
                  options={{ ...matched, propName: options.propName }}
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
