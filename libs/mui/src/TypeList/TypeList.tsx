import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import type { PropTypesDef } from '@appcraft/types';

import { Subheader } from '../Subheader';
import { TypeItem } from '../TypeItem';
import { useNodePicker } from '../useNodePicker';
import { useOptionsSorting, usePropPathChange } from './TypeList.hooks';
import { usePropPath, usePropValue } from '../InteractivedContext';
import type { TypeListProps } from './TypeList.types';

export default function TypeList({
  ActionButtonProps,
  disableSelection,
  superior,
  values,
  onActionNodePick = (e) => e,
  onFilterToggle,
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

  const actionNode = useNodePicker(
    () =>
      onActionNodePick({
        filter: (
          <IconButton
            {...ActionButtonProps}
            onClick={(e) => onFilterToggle(e.currentTarget)}
          >
            <FilterAltOutlinedIcon />
          </IconButton>
        ),
      }),
    []
  );

  return (
    <List
      subheader={
        <Subheader
          breadcrumbs={breadcrumbs}
          action={actionNode}
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
