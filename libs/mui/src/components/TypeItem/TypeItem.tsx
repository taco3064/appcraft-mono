import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import { TypeItemAction } from '../../styles';
import { useTypeCategory } from '../../hooks';
import * as Common from '../common';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  action,
  disableSelection = false,
  onDelete,
  onSubitemView,
  options,
}: Types.TypeItemProps) {
  const category = useTypeCategory(options);

  const selection = disableSelection ? null : (
    <ListItemIcon>
      <Checkbox color="primary" />
    </ListItemIcon>
  );

  const actions =
    !action && !onDelete ? null : (
      <TypeItemAction onClick={(e) => e.stopPropagation()}>
        {action}

        {onDelete && (
          <IconButton onClick={() => onDelete(options)}>
            <CloseIcon />
          </IconButton>
        )}
      </TypeItemAction>
    );

  return (
    <>
      {category === 'Display' && (
        <Common.TypeItemDisplay
          action={actions}
          selection={selection}
          options={options as Common.TypeItemDisplayProps['options']}
          onClick={onSubitemView}
        />
      )}

      {category === 'Pure' && (
        <Common.TypeItemPure
          action={actions}
          selection={selection}
          options={options as Common.TypeItemPureProps['options']}
        />
      )}

      {category === 'Mixed' && (
        <Common.TypeItemMixed
          action={actions}
          selection={selection}
          options={options as Common.TypeItemMixedProps['options']}
          renderMatchedField={(matched, matchedAction) => (
            <TypeItem
              {...{ disableSelection, onDelete, onSubitemView }}
              options={matched}
              action={matchedAction}
            />
          )}
        />
      )}
    </>
  );
}
