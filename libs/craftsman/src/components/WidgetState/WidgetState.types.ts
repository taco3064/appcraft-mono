import type { ConfigOptions, MainWidget } from '@appcraft/types';
import type { ReactNode } from 'react';

import type * as Context from '../../contexts';
import type { EditedState, FetchTypeDefinition } from '../../hooks';

//* Variables
export type EditToggleHandler = (e?: EditedState) => void;

//* Component Props
export interface WidgetStateProps {
  ct: Context.FixedT;
  typeFile?: string;
  values: MainWidget;
  onBack: () => void;
  onChange: (e: MainWidget) => void;
  onFetchDefinition: FetchTypeDefinition;
  onStateEdit: (target?: EditedState) => void;

  renderEditor: (options: {
    exclude: RegExp[];
    fixedT: Context.FixedT;
    values: ConfigOptions;
    onChange: Context.ChangeHandler<ConfigOptions>;
    onFetchDefinition: FetchTypeDefinition;
  }) => ReactNode;
}
