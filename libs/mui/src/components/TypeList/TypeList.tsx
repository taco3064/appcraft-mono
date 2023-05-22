import List from '@mui/material/List';
import type { PropTypesDef } from '@appcraft/types';

import { TypeItem } from '../TypeItem';
import { TypeSubheader } from '../TypeSubheader';
import { useOptionsSorting, usePropPathChange } from './TypeList.hooks';
import { usePropPath, usePropValue } from '../../contexts';
import type { TypeListProps } from './TypeList.types';

export default function TypeList({
  disableSelection,
  superior,
  values,
  onPropPathChange,
}: TypeListProps) {
  const propPath = usePropPath();
  const options = useOptionsSorting(superior);
  const [value, onChange] = usePropValue<object>(superior?.propName);

  const isSubElAllowed =
    /^object/.test(superior?.type) ||
    (superior?.type === 'arrayOf' && !Array.isArray(superior.options));

  const [breadcrumbs, { back: handleBack, to: handleTo }] = usePropPathChange(
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
            !isSubElAllowed
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
      {superior?.type === 'exact' &&
        options.map((opts) => (
          <TypeItem
            key={opts.propName}
            disableSelection={disableSelection}
            options={opts}
            onDisplayItemClick={handleTo}
          />
        ))}

      {/^object/.test(superior?.type) &&
        Object.keys(value || {}).map((propName) => {
          const opts: PropTypesDef = {
            ...(superior?.options as PropTypesDef),
            propName,
          };

          return (
            <TypeItem
              key={propName}
              disableSelection={disableSelection}
              options={opts}
              onDisplayItemClick={handleTo}
              onItemRemove={() => {
                delete (value as Record<string, unknown>)[propName];
                onChange({ ...value });
              }}
            />
          );
        })}

      {superior?.type === 'arrayOf' &&
        Array.isArray(superior.options) &&
        superior.options.map((opts) => (
          <TypeItem
            key={opts.propName}
            disableSelection={disableSelection}
            options={opts}
            onDisplayItemClick={handleTo}
          />
        ))}

      {isSubElAllowed &&
        Array.isArray(value) &&
        value.map((_el, i) => {
          const opts: PropTypesDef = {
            ...(superior?.options as PropTypesDef),
            propName: `[${i}]`,
          };

          return (
            <TypeItem
              key={`el_${i}`}
              disableSelection={disableSelection}
              options={opts}
              onDisplayItemClick={handleTo}
              onItemRemove={() => {
                value.splice(i, 1);
                onChange([...value]);
              }}
            />
          );
        })}
    </List>
  );
}
