import type * as Appcraft from '@appcraft/types';
import type { LazyExoticComponent } from 'react';

//* Variables
export type Template = Map<string, Appcraft.RootNodeWidget>;
type LazyProps = { children: (templates: Template) => JSX.Element };

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
  tempaltes?: Template
) => Promise<Template>;

//* Custom Hooks
export type LazyRendererHook = (
  options: RendererOptions,
  onFetchWidget: FetchWidgetHandler
) => LazyExoticComponent<(props: LazyProps) => JSX.Element>;
