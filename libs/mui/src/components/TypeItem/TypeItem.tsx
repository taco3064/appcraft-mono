import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

import { useTypeCategory } from '../../hooks';
import * as Common from '../common';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  action,
  collectionType,
  disableSelection = false,
  options,
  onDelete,
  onSubitemView,
}: Types.TypeItemProps) {
  const [status, setStatus] = useState<Common.Status>(null);
  const category = useTypeCategory(options);

  const selection = disableSelection ? null : (
    <Common.TypeItemSelection
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
        <Common.TypeItemDisplay
          action={actions}
          options={options as Common.TypeItemDisplayProps['options']}
          selection={selection}
          onClick={onSubitemView}
        />
      )}

      {category === 'Pure' && (
        <Common.TypeItemPure
          action={actions}
          collectionType={collectionType}
          options={options as Common.TypeItemPureProps['options']}
          selection={selection}
        />
      )}

      {category === 'Mixed' && (
        <Common.TypeItemMixed
          action={actions}
          collectionType={collectionType}
          options={options as Common.TypeItemMixedProps['options']}
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
