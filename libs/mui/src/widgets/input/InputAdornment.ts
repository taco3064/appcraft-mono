import InputAdornment from '@mui/material/InputAdornment';
import type { ComponentProps } from 'react';

export { InputAdornment };

export type InputAdornmentProps = Pick<
  ComponentProps<typeof InputAdornment>,
  | 'position'
  | 'children'
  | 'disablePointerEvents'
  | 'disableTypography'
  | 'variant'
>;
