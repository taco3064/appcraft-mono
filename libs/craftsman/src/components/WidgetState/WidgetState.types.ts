import type { ConfigOptions, MainWidget } from '@appcraft/types';
import type { ReactNode } from 'react';

import type * as Context from '../../contexts';
import type { FetchTypeDefinition } from '../../hooks';

//* Variables
export type EditToggleHandler = (path?: string) => void;

//* Component Props
export interface WidgetStateProps {
  typeFile?: string;
  values: MainWidget;
  onBack: () => void;
  onChange: (e: MainWidget) => void;
  onFetchDefinition: FetchTypeDefinition;

  renderEditor: (options: {
    exclude: RegExp[];
    values: ConfigOptions;
    onChange: Context.ChangeHandler<ConfigOptions>;
    onFetchDefinition: FetchTypeDefinition;
  }) => ReactNode;
}
