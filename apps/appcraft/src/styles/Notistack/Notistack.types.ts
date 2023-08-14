import * as Notistack from 'notistack';
import type { ComponentProps } from 'react';

export interface MuiSnackbarContentProps
  extends ComponentProps<typeof Notistack.MaterialDesignContent> {
  classes?: {
    root?: string;
  };
}

export interface MuiSnackbarProviderProps
  extends Omit<
    Notistack.SnackbarProviderProps,
    'anchorOrigin' | 'classes' | 'iconVariant' | 'Components'
  > {
  classes?: Notistack.SnackbarProviderProps['classes'] & {
    icon?: string;
  };
}
