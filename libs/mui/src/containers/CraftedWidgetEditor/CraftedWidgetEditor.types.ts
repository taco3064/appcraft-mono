import type * as Appcraft from '@appcraft/types';
import type { ComponentProps } from 'react';

import { WidgetAppBar } from '../../styles';
import type * as Comp from '../../components';
import type * as Context from '../../contexts';
import type * as Hook from '../../hooks';

export type LazyWidgetElementsProps = Omit<
  Comp.WidgetElementProps<Appcraft.WidgetOptions>,
  'index' | 'item' | 'event' | 'node' | 'defaultOpen'
> & {
  widgets: Appcraft.WidgetOptions[];
};

export interface CraftedWidgetEditorProps {
  BackButtonProps?: ComponentProps<typeof WidgetAppBar>['BackButtonProps'];
  disableCategories?: Comp.TodoFlowControlsProps['disableCategories'];
  fixedT?: Context.FixedT;
  stateTypeFile?: string;
  todoTypeFile?: string;
  version?: string;
  widget?: Appcraft.RootNodeWidget;
  overrideNamingProps?: Context.OverrideNamingProps;
  renderOverrideItem?: Context.RenderOverrideItem;
  onFetchNodesAndEvents: Hook.FetchNodesAndEvents;
  onFetchDefinition: Hook.FetchTypeDefinition;
  onFetchWidgetWrapper: Hook.FetchWrapperHandler<'widget'>;
  onWidgetChange: (e: Appcraft.RootNodeWidget | null) => void;
}
