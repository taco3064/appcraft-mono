import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import * as Common from '../common';
import * as Hooks from '../../hooks';
import { TypeItemAction } from '../../styles';
import type { TypeItemPureProps } from './TypeItemPure.types';

export default function TypeItemPure({
  action,
  disabled = false,
  label,
  options,
  propPath,
  selection,
}: TypeItemPureProps) {
  const { value, onChange } = Hooks.usePropValue(propPath);

  return (
    <ListItem>
      {selection}

      <ListItemText
        disableTypography
        primary={
          <>
            {options.type === 'string' && (
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                disabled={disabled}
                required={options.required}
                label={label}
                defaultValue={value || ''}
                onChange={(e) => onChange(e.target.value)}
              />
            )}

            {options.type === 'bool' && (
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                disabled={disabled}
                required={options.required}
                InputProps={
                  {
                    inputComponent: Common.BoolInput,
                    inputProps: {
                      label,
                      checked: Boolean(value),
                      onChange: (e: { target: { checked: boolean } }) =>
                        onChange(e.target.checked),
                    },
                  } as object
                }
              />
            )}

            {options.type === 'number' && (
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                disabled={disabled}
                required={options.required}
                label={label}
                InputProps={
                  {
                    inputComponent: Common.NumberInput,
                    inputProps: {
                      defaultValue: value as number,
                      onChange: (e: { target: { value: string } }) =>
                        onChange(
                          !e.target.value
                            ? undefined
                            : Number.parseFloat(
                                e.target.value.replace(/,/g, '')
                              )
                        ),
                    },
                  } as object
                }
              />
            )}

            {options.type === 'oneOf' && (
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                disabled={disabled}
                required={options.required}
                label={label}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                SelectProps={{ displayEmpty: options.required }}
              >
                {!options.required && <MenuItem value="">&nbsp;</MenuItem>}

                {options.options?.map((option) => (
                  <MenuItem key={option.toString()} value={option as string}>
                    {option.toString()}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </>
        }
      />

      {action && (
        <TypeItemAction onClick={(e) => e.stopPropagation()}>
          {action}
        </TypeItemAction>
      )}
    </ListItem>
  );
}
