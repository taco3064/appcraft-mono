import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { forwardRef } from 'react';

import type { BoolInputProps } from './BoolInput.types';

const BoolInput = forwardRef<HTMLInputElement, BoolInputProps>(
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

BoolInput.displayName = 'BoolInput';
export default BoolInput;
