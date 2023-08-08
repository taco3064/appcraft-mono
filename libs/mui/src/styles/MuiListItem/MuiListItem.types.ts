import type { ReactNode } from 'react';
import type { StyledComponentProps } from '@mui/material/styles';

export interface ListPlaceholderProps
  extends StyledComponentProps<'text' | 'primary'> {
  message: string;
  action?: ReactNode;
}
