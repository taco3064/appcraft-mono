import type { PropTypesDef } from '@appcraft/types';
import type { ReactNode } from 'react';

import type { PropPaths, StateGenerator } from '../../utils';

//* Variables
export type SelectHandler = (checked: boolean, options?: PropTypesDef) => void;

//* Custom Hook
export type StateSelectionHook = (
  generator: StateGenerator,
  alias: string,
  propPath: PropPaths | string,
  renderFn: (options: {
    checked: boolean;
    onSelect: SelectHandler;
  }) => ReactNode
) => [boolean, ReactNode];
