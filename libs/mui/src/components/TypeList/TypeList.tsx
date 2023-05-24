import List from '@mui/material/List';

import { TypeItem } from '../TypeItem';
import { TypeSubheader } from '../TypeSubheader';
import { usePropPath } from '../../contexts';
import { usePropertyRouter, useTypeItems } from '../../hooks';
import type { TypeListProps } from './TypeList.types';

export default function TypeList({
  disableSelection,
  superior,
  values,
  onPropPathChange,
}: TypeListProps) {
  const propPath = usePropPath();
  const { isModifiable, items, value, onChange } = useTypeItems(superior);

  const [breadcrumbs, { back: handleBack, to: handleTo }] = usePropertyRouter(
    { values, onPropPathChange },
    propPath
  );

  return (
    <List
      subheader={
        <TypeSubheader
          breadcrumbs={breadcrumbs}
          onBack={handleBack}
          onAddElement={
            !isModifiable
              ? undefined
              : () =>
                  onChange(
                    superior.type === 'arrayOf'
                      ? [...((value as []) || []), null]
                      : {
                          ...value,
                          [`key_${Object.keys(value || {}).length}`]: null,
                        }
                  )
          }
        />
      }
    >
      {items.map(({ key, options, onItemRemove }) => (
        <TypeItem
          {...{ key, disableSelection, options, onItemRemove }}
          onDisplayItemClick={handleTo}
        />
      ))}
    </List>
  );
}
