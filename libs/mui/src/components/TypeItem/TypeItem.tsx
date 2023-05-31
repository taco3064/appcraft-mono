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
  options,
  onDisplayItemClick,
  onItemRemove,
}: Types.TypeItemProps) {
  const category = useTypeCategory(options);

  const selection = disableSelection ? null : (
    <ListItemIcon>
      <Checkbox color="primary" />
    </ListItemIcon>
  );

  const actions =
    !action && !onItemRemove ? null : (
      <TypeItemAction onClick={(e) => e.stopPropagation()}>
        {action}

        {onItemRemove && (
          <IconButton onClick={() => onItemRemove(options)}>
            <CloseIcon />
          </IconButton>
        )}
      </TypeItemAction>
    );

  return (
    <>
      {category === 'Display' && (
        <Common.DisplayField
          action={actions}
          selection={selection}
          options={options as Common.DisplayFieldProps['options']}
          onClick={onDisplayItemClick}
        />
      )}

      {category === 'Pure' && (
        <Common.PureField
          action={actions}
          selection={selection}
          options={options as Common.PureFieldProps['options']}
        />
      )}

      {category === 'Mixed' && (
        <Common.MixedField
          action={actions}
          selection={selection}
          options={options as Common.MixedFieldProps['options']}
          renderMatchedField={(matched, matchedAction) => (
            <TypeItem
              {...{ disableSelection, onDisplayItemClick, onItemRemove }}
              options={matched}
              action={matchedAction}
            />
          )}
        />
      )}
    </>
  );
}
