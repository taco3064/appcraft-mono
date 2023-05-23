import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { BoolInput } from '../BoolInput';
import { NumberInput } from '../NumberInput';
import { useDisplayPropName } from '../../../hooks';
import { usePropValue } from '../../../contexts';
import type { PureFieldProps } from './PureField.types';

export default function PureField({ options }: PureFieldProps) {
  const displayName = useDisplayPropName(options.propName);
  const [value, onChange] = usePropValue<unknown>(options.propName);

  switch (options.type) {
    case 'bool':
      return (
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
      );

    case 'number':
      return (
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
                      : Number.parseFloat(e.target.value.replace(/,/g, ''))
                  ),
              },
            } as object
          }
        />
      );

    case 'oneOf':
      return (
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
      );

    case 'string':
      return (
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          required={options.required}
          label={displayName}
          defaultValue={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    default:
      return null;
  }
}
