import type * as Appcraft from '@appcraft/types';
import type { LazyExoticComponent } from 'react';

import type { Templates } from '../common';

//* Variables
type LazyProps = { children: JSX.Element };

export type RendererOptions =
  | Appcraft.RootNodeWidget
  | { widget: Appcraft.RootNodeWidget }[];

export type FetchWidgetHandler = (
  id: string
) => Promise<Appcraft.RootNodeWidget>;

//* Methods
export type FetchWidgets = (
  widgets: Appcraft.RootNodeWidget[],
  onFetchWidget: FetchWidgetHandler,
  tempaltes?: Templates
) => Promise<Templates>;

//* Custom Hooks
export type LazyRendererHook = (
  options: RendererOptions,
  onFetchWidget: FetchWidgetHandler
) => {
  LazyRenderer: LazyExoticComponent<(props: LazyProps) => JSX.Element>;
  templates: Templates;
};
