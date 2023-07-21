import type { ReactNode } from 'react';
import type { PropPaths } from '../../utils';

export type StateSelectionHook = (
  type: 'props' | 'nodes' | 'todos',
  alias: string,
  propPath: PropPaths | string,
  renderFn: (options: {
    checked: boolean;
    onSelect: (checked: boolean) => void;
  }) => ReactNode
) => [boolean, ReactNode];
