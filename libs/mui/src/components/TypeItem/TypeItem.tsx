import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import { TinyAvatar } from '../../styles';
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
  const category = useTypeCategory(options);

  const selection = disableSelection ? null : (
    <ListItemIcon onClick={(e) => e.stopPropagation()}>
      <Checkbox
        color="primary"
        checkedIcon={
          <TinyAvatar variant="square" color="primary">
            S
          </TinyAvatar>
        }
        indeterminateIcon={
          <TinyAvatar variant="square" color="secondary">
            P
          </TinyAvatar>
        }
      />
    </ListItemIcon>
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
