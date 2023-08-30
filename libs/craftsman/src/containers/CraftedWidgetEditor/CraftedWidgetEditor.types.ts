import type * as Appcraft from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';
import type { ComponentProps, ReactNode } from 'react';

import { WidgetAppBar } from '../../styles';
import type * as Comp from '../../components';
import type * as Ctx from '../../contexts';
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
  disableState?: boolean;
  disableTodoCategories?: Comp.TodoFlowControlsProps['disableCategories'];
  stateTypeFile?: string;
  title?: ReactNode;
  todoTypeFile?: string;
  version?: string;
  widget: Appcraft.MainWidget;
  overrideMixedOptions?: Ctx.OverrideMixedOptions;
  overrideNamingProps?: Ctx.OverrideNamingProps;
  renderOverrideItem?: Ctx.RenderOverrideItem;
  onFetchNodesAndEvents: Hook.FetchNodesAndEvents;
  onFetchData: Exhibitor.FetchDataHandler;
  onFetchDefinition: Hook.FetchTypeDefinition;
  onFetchWrapper: Exhibitor.FetchWrapperHandler<'widget' | 'todo'>;
  onWidgetChange: (e: Appcraft.MainWidget | null) => void;
}
