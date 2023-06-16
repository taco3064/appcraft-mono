import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

import { TypeItemDisplay, TypeItemDisplayProps } from '../TypeItemDisplay';
import { TypeItemMixed, TypeItemMixedProps } from '../TypeItemMixed';
import { TypeItemPure, TypeItemPureProps } from '../TypeItemPure';
import { TypeItemSelection, Status } from '../common';
import { useTypeCategory } from '../../hooks';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  action,
  collectionType,
  disableSelection = false,
  options,
  onDelete,
  onSubitemView,
}: Types.TypeItemProps) {
  const [status, setStatus] = useState<Status>(null);
  const category = useTypeCategory(options);

  const selection = disableSelection ? null : (
    <TypeItemSelection
      status={status}
      onStatusChange={(newStatus) => setStatus(newStatus)}
    />
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
          options={options as TypeItemDisplayProps['options']}
          selection={selection}
          onClick={onSubitemView}
        />
      )}

      {category === 'Pure' && (
        <TypeItemPure
          action={actions}
          collectionType={collectionType}
          options={options as TypeItemPureProps['options']}
          selection={selection}
        />
      )}

      {category === 'Mixed' && (
        <TypeItemMixed
          action={actions}
          collectionType={collectionType}
          options={options as TypeItemMixedProps['options']}
          selection={selection}
          renderMatchedField={(matched, matchedAction) => (
            <TypeItem
              {...{ collectionType, disableSelection, onDelete, onSubitemView }}
              options={matched}
              action={matchedAction}
            />
          )}
        />
      )}
    </>
  );
}
