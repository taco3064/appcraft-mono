import type { ReactNode } from 'react';

export type StateSelectionHook = (
  propPath: string,
  renderFn: (options: {
    checked: boolean;
    onSelect: (checked: boolean) => void;
  }) => ReactNode
) => [boolean, ReactNode];
