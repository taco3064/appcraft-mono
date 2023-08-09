import type { DialogProps } from '@mui/material/Dialog';
import type { FormEventHandler, ReactNode } from 'react';
import type { Theme } from '@mui/material/styles';

export interface FlexDialogProps
  extends Omit<DialogProps, 'classes' | 'scroll' | 'title' | 'onSubmit'> {
  contentHeight?: string | number | ((theme: Theme) => string | number);
  disableContentGutter?: boolean;
  disableContentJustifyCenter?: boolean;
  disableContentPadding?: boolean;
  icon?: ReactNode;
  title?: string | { primary: string; secondary?: string };
  action?: ReactNode;
  children: ReactNode;
  direction?: 'row' | 'column';
  onSubmit?: FormEventHandler<HTMLFormElement>;

  classes?: DialogProps['classes'] & {
    header?: string;
    closeButton?: string;
    content?: string;
    footer?: string;
  };
}
