import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { BoolInput } from '../BoolInput';
import { NumberInput } from '../NumberInput';
import { useDisplayPropName } from '../../../hooks';
import { usePropValue } from '../../../contexts';
import type { PureFieldProps } from './PureField.types';

export default function PureField({
  action,
  selection,
  options,
}: PureFieldProps) {
  const displayName = useDisplayPropName(options.propName);
  const [value, onChange] = usePropValue<unknown>(options.propName);

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
                required={options.required}
                label={displayName}
                defaultValue={value || ''}
                onChange={(e) => onChange(e.target.value)}
              />
            )}

            {options.type === 'bool' && (
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                required={options.required}
                InputProps={
                  {
                    inputComponent: BoolInput,
                    inputProps: {
                      label: displayName,
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
                required={options.required}
                label={displayName}
                InputProps={
                  {
                    inputComponent: NumberInput,
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
                required={options.required}
                label={displayName}
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

      {action}
    </ListItem>
  );
}
