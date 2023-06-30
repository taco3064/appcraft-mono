import type * as Appcraft from '@appcraft/types';

import type { FixedT } from '../../contexts';
import type { WidgetAddDialogProps } from '../WidgetAddDialog';
import type { WidgetNodeProps } from '../WidgetNode';

export interface NodeSelectEvent {
  item: Appcraft.WidgetOptions;
  type: Appcraft.NodeType;
  path: string;
  index: number;
}

export type LazyWidgetNodesProps<A> = Omit<
  WidgetNodeProps<Appcraft.WidgetOptions>,
  'item' | 'structure' | 'onActive'
> & {
  onActive: A;
};

export interface CraftedWidgetEditorProps
  extends Pick<WidgetAddDialogProps, 'renderWidgetTypeSelection'> {
  fetchOptions: Record<'parser' | 'getNodesAndEvents', Appcraft.FetchOptions>;
  fixedT?: FixedT;
  widget?: Appcraft.RootNodeWidget;

  onWidgetChange: (e: Appcraft.RootNodeWidget | null) => void;
}
