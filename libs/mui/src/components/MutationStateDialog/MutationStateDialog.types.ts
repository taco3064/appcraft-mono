import type { AppBarProps } from '@mui/material/AppBar';
import type { ConfigOptions, RootNodeWidget } from '@appcraft/types';
import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';

import type * as Context from '../../contexts';
import type { FetchTypeDefinition } from '../../hooks';

export type HeaderProps = {
  primary: string;
  secondary?: string;
  onBack: () => void;
  sx?: AppBarProps['sx'];
};

export interface MutationStateDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  ct: Context.FixedT;
  typeFile?: string;
  values: RootNodeWidget;
  onConfirm: (e: RootNodeWidget) => void;
  onFetchDefinition: FetchTypeDefinition;

  renderEditor: (options: {
    HeaderProps: HeaderProps;
    exclude: RegExp[];
    fixedT: Context.FixedT;
    values: ConfigOptions;
    onChange: Context.ChangeHandler<ConfigOptions>;
    onFetchDefinition: FetchTypeDefinition;
  }) => ReactNode;
}
