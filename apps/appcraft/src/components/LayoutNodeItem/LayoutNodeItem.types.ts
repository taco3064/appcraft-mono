import type { ElementState, NodeState } from '@appcraft/types';

export interface LayoutNodeItemProps {
  state: ElementState | NodeState;
  onChange: (value: unknown) => void;
}
