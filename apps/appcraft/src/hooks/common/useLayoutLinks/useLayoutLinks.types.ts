import type { LayoutWidget } from '@appcraft/types';

export type LayoutLinksHook = (
  layout: LayoutWidget,
  onChange: (value: LayoutWidget) => void
) => [Set<string>, (path: string) => void];
