import type * as Appcraft from '@appcraft/types';

import type * as Comp from '../../components';
import type * as Hook from '../../hooks';
import type { FixedT } from '../../contexts';

export interface NodeSelectEvent {
  item: Appcraft.WidgetOptions;
  type: Appcraft.NodeType;
  path: string;
  index: number;
}

export type LazyWidgetNodesProps = Omit<
  Comp.WidgetNodeProps<Appcraft.WidgetOptions>,
  'index' | 'item' | 'event' | 'structure'
>;

export interface CraftedWidgetEditorProps
  extends Pick<Comp.MutationNewWidgetDialogProps, 'renderWidgetTypeSelection'> {
  fixedT?: FixedT;
  todoTypeFile?: string;
  version?: string;
  widget?: Appcraft.RootNodeWidget;
  onFetchNodesAndEvents: Hook.FetchNodesAndEvents;
  onFetchConfigDefinition: Hook.FetchTypeDefinition;
  onFetchWidgetDefinition: Hook.FetchTypeDefinition;
  onWidgetChange: (e: Appcraft.RootNodeWidget | null) => void;
}
