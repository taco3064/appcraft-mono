import TextField from '@mui/material/TextField';
import type { ComponentProps } from 'react';

export type WidgetTypeSelectProps = Omit<
  ComponentProps<typeof TextField>,
  'SelectProps' | 'children' | 'select'
>;
