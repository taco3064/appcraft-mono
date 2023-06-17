import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import * as Hooks from '../../hooks';
import { ConstructSelection } from '../common';
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
  onSubitemView,
}: Types.TypeItemProps) {
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
        {action}

        {onDelete && (
          <IconButton onClick={() => onDelete(options)}>
            <CloseIcon />
          </IconButton>
        )}
      </>
    );

  return (
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
          disabled={disabled || Boolean(status)}
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
  );
}
