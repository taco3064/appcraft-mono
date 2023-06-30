import type * as Appcraft from '@appcraft/types';
import type { FixedT, PropPaths } from '../../contexts';

export interface WidgetNodeProps<I extends Appcraft.WidgetOptions> {
  fixedT?: FixedT;
  index?: number;
  item: I;
  event?: I extends Appcraft.NodeWidget ? string[] : false;
  structure?: I extends Appcraft.NodeWidget ? Appcraft.ChildNodes : false;

  onClick: (item: I) => void;
  onEventActive: (item: I, path: string) => void;
  onNodeActive: (type: Appcraft.NodeType, paths: PropPaths) => void;
  onRemove: (item: I) => void;
}
