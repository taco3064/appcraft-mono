import FormGroup from '@mui/material/FormGroup';
import type { ComponentProps } from 'react';

export { FormGroup };

export type FormGroupProps = Pick<
  ComponentProps<typeof FormGroup>,
  'children' | 'row'
>;
