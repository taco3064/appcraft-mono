import type { ReactNode } from 'react';
import type { PropPaths, StateGenerator } from '../../utils';

export type StateSelectionHook = (
  generator: StateGenerator,
  alias: string,
  propPath: PropPaths | string,
  renderFn: (options: {
    checked: boolean;
    onSelect: (checked: boolean) => void;
  }) => ReactNode
) => [boolean, ReactNode];
