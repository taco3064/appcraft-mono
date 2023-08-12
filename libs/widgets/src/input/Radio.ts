import Radio from '@mui/material/Radio';
import type { ComponentProps } from 'react';

export { Radio };

export type RadioProps = Pick<
  ComponentProps<typeof Radio>,
  | 'checked'
  | 'checkedIcon'
  | 'color'
  | 'disabled'
  | 'disableRipple'
  | 'icon'
  | 'name'
  | 'onChange'
  | 'required'
  | 'size'
  | 'value'
>;
