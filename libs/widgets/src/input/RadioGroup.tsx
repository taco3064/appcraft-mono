import RadioGroup from '@mui/material/RadioGroup';
import type { ComponentProps } from 'react';

export { RadioGroup };

export type RadioGroupProps = Pick<
  ComponentProps<typeof RadioGroup>,
  'children' | 'defaultValue' | 'name' | 'onChange' | 'value'
>;
