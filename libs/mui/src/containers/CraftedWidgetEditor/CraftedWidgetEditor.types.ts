import type * as Appcraft from '@appcraft/types';
import type { ComponentProps } from 'react';

import { WidgetAppBar } from '../../styles';
import type * as Comp from '../../components';
import type * as Hook from '../../hooks';
import type { FixedT } from '../../contexts';
import type { RenderOverrideItem } from '../../contexts';

export interface NodeSelectEvent {
  item: Appcraft.WidgetOptions;
  type: Appcraft.NodeType;
  path: string;
  index: number;
}

export type LazyWidgetElementsProps = Omit<
  Comp.WidgetElementProps<Appcraft.WidgetOptions>,
  'index' | 'item' | 'event' | 'node' | 'defaultOpen'
> & {
  widgets: Appcraft.WidgetOptions[];
};

export interface CraftedWidgetEditorProps {
  BackButtonProps?: ComponentProps<typeof WidgetAppBar>['BackButtonProps'];
  disableCategories?: Comp.TodoFlowControlsProps['disableCategories'];
  fixedT?: FixedT;
  stateTypeFile?: string;
  todoTypeFile?: string;
  version?: string;
  widget?: Appcraft.RootNodeWidget;
  renderOverrideItem?: RenderOverrideItem;
  onFetchNodesAndEvents: Hook.FetchNodesAndEvents;
  onFetchDefinition: Hook.FetchTypeDefinition;
  onWidgetChange: (e: Appcraft.RootNodeWidget | null) => void;
}
