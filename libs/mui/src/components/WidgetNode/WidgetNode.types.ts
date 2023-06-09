import type * as Appcraft from '@appcraft/types';
import type { FixedT, PropPaths } from '../../contexts';
import type { PathsChangeHandler } from '../../hooks';

export interface WidgetNodeProps<I extends Appcraft.WidgetOptions> {
  ct: FixedT;
  index: number;
  item: I;
  event: I extends Appcraft.NodeWidget ? string[] : undefined;
  structure: I extends Appcraft.NodeWidget ? Appcraft.ChildNodes : undefined;
  superiorNodeType: Appcraft.NodeType;

  onClick: (paths: PropPaths) => void;
  onEventActive: (paths: PropPaths) => void;
  onNodeActive: PathsChangeHandler;
  onRemove: (paths: PropPaths) => void;
}
