import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { forwardRef } from 'react';

import { useDisplayPropName } from './TypeFields.hooks';
import { usePropValue } from '../EditorContext';
import type * as Types from './TypeFields.types';

const BoolInput = forwardRef<HTMLInputElement, Types.BoolInputProps>(
  ({ className: _cn, ...props }, ref) => (
    <FormControlLabel
      {...props}
      inputRef={ref}
      labelPlacement="start"
      control={<Switch color="primary" />}
      sx={(theme) => ({
        width: '100%',
        height: theme.spacing(5),
        margin: theme.spacing(0, 2),

        '& > .MuiFormControlLabel-label': {
          width: '100%',
        },
      })}
    />
  )
);

const NumberInput = forwardRef<HTMLInputElement, NumericFormatProps>(
  (props, ref) => (
    <NumericFormat {...props} thousandSeparator getInputRef={ref} />
  )
);

export default function PureField({ options }: Types.PureFieldProps) {
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
