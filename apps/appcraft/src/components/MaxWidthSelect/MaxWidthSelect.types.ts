import TextField from '@mui/material/TextField';
import type { Breakpoint } from '@mui/material/styles';
import type { ComponentProps } from 'react';

export interface MaxWidthSelectProps
  extends Omit<ComponentProps<typeof TextField>, 'chidlren' | 'select'> {
  breakpoint: Breakpoint;
}
