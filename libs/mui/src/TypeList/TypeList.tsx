import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { ArrayOfProp, PropTypesDef } from '@appcraft/types';

import { TypeItem } from '../TypeItem';
import { useOptionsSorting, usePropPathChange } from './TypeList.hooks';
import { usePropPath, usePropValue } from '../InteractivedContext';
import type { TypeListProps } from './TypeList.types';

export default function TypeList({
  disableSelection,
  superior,
  values,
  onPropPathChange,
}: TypeListProps) {
  const propPath = usePropPath();
  const options = useOptionsSorting(superior);
  const [value, onChange] = usePropValue<object>(superior.propName);

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
        propPath && (
          <ListSubheader
            component={Toolbar}
            variant="dense"
            sx={{ background: 'inherit', gap: 1 }}
          >
            <IconButton size="small" onClick={() => handleBack()}>
              <ChevronLeftIcon />
            </IconButton>

            <Breadcrumbs separator="." style={{ marginRight: 'auto' }}>
              {breadcrumbs.map(({ name, isArrayElement, isLast }, i) =>
                isLast ? (
                  <Typography
                    key={`${name}_${i}`}
                    variant="subtitle1"
                    color="secondary"
                  >
                    {isArrayElement ? `[${name}]` : name}
                  </Typography>
                ) : (
                  <Link
                    key={`${name}_${i}`}
                    component="button"
                    underline="hover"
                    variant="subtitle1"
                    color="text.primary"
                    onClick={() => handleBack(i)}
                  >
                    {isArrayElement ? `[${name}]` : name}
                  </Link>
                )
              )}
            </Breadcrumbs>

            {isSubElAllowed && (
              <>
                <Divider flexItem orientation="vertical" />

                <IconButton
                  size="small"
                  onClick={() =>
                    onChange(
                      superior.type === 'arrayOf'
                        ? [...((value as []) || []), null]
                        : {
                            ...value,
                            [`key_${Object.keys(value || {}).length}`]: null,
                          }
                    )
                  }
                >
                  <PlaylistAddIcon />
                </IconButton>
              </>
            )}
          </ListSubheader>
        )
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
