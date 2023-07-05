import type * as Appcraft from '@appcraft/types';

import type { FixedT } from '../../contexts';
import type { WidgetAddDialogProps, WidgetNodeProps } from '../../components';

export interface NodeSelectEvent {
  item: Appcraft.WidgetOptions;
  type: Appcraft.NodeType;
  path: string;
  index: number;
}

export type LazyWidgetNodesProps = Omit<
  WidgetNodeProps<Appcraft.WidgetOptions>,
  'index' | 'item' | 'event' | 'structure'
>;

export interface CraftedWidgetEditorProps
  extends Pick<WidgetAddDialogProps, 'renderWidgetTypeSelection'> {
  fixedT?: FixedT;
  todoTypeFile?: string;
  version?: string;
  widget?: Appcraft.RootNodeWidget;
  onWidgetChange: (e: Appcraft.RootNodeWidget | null) => void;

  fetchOptions: Record<
    'configParser' | 'propsParser' | 'getNodesAndEvents',
    Appcraft.FetchOptions
  >;
}
