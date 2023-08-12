import FormControlLabel from '@mui/material/FormControlLabel';
import type { ComponentProps } from 'react';

export { FormControlLabel };

export type FormControlLabelProps = Pick<
  ComponentProps<typeof FormControlLabel>,
  | 'control'
  | 'checked'
  | 'disabled'
  | 'disableTypography'
  | 'label'
  | 'labelPlacement'
  | 'onChange'
  | 'required'
  | 'value'
>;
