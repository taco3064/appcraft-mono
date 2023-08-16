import type * as Appcraft from '@appcraft/types';
import type { ComponentProps } from 'react';
import type { FetchWrapperHandler } from '@appcraft/exhibitor';

import { WidgetAppBar } from '../../styles';
import type * as Comp from '../../components';
import type * as Context from '../../contexts';
import type * as Hook from '../../hooks';

//* Methods
export type GetActiveType = (options: {
  editedWidgetCategory?: 'node' | 'plainText';
  stateOpen: boolean;
  todoPath?: string;
}) => 'state' | 'todos' | 'props' | 'nodes';

//* Component Props
export type LazyWidgetElementsProps = Omit<
  Comp.WidgetElementProps<Appcraft.EntityWidgets>,
  'index' | 'item' | 'event' | 'node' | 'defaultOpen'
> & {
  widgets: Appcraft.EntityWidgets[];
};

export interface CraftedWidgetEditorProps {
  BackButtonProps?: ComponentProps<typeof WidgetAppBar>['BackButtonProps'];
  disableCategories?: Comp.TodoFlowControlsProps['disableCategories'];
  fixedT?: Context.FixedT;
  stateTypeFile?: string;
  todoTypeFile?: string;
  version?: string;
  widget?: Appcraft.MainWidget;
  overrideNamingProps?: Context.OverrideNamingProps;
  renderOverrideItem?: Context.RenderOverrideItem;
  onFetchNodesAndEvents: Hook.FetchNodesAndEvents;
  onFetchDefinition: Hook.FetchTypeDefinition;
  onFetchWidgetWrapper: FetchWrapperHandler<'widget'>;
  onWidgetChange: (e: Appcraft.MainWidget | null) => void;
}
