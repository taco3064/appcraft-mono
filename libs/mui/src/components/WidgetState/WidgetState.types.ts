import type { AppBarProps } from '@mui/material/AppBar';
import type { ConfigOptions, RootNodeWidget } from '@appcraft/types';
import type { ReactNode } from 'react';

import type * as Context from '../../contexts';
import type { EditedState, FetchTypeDefinition } from '../../hooks';

export type HeaderProps = {
  primary: string;
  secondary?: string;
  onBack: () => void;
  sx?: AppBarProps['sx'];
};

export interface WidgetStateProps {
  ct: Context.FixedT;
  typeFile?: string;
  values: RootNodeWidget;
  onChange: (e: RootNodeWidget) => void;
  onFetchDefinition: FetchTypeDefinition;
  onStateEdit: (target?: EditedState) => void;

  renderEditor: (options: {
    HeaderProps: HeaderProps;
    exclude: RegExp[];
    fixedT: Context.FixedT;
    values: ConfigOptions;
    onChange: Context.ChangeHandler<ConfigOptions>;
    onFetchDefinition: FetchTypeDefinition;
  }) => ReactNode;
}
