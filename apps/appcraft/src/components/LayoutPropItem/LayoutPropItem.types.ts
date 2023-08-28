import type { PropsState } from '@appcraft/types';

export interface LayoutPropItemProps {
  state: PropsState;
  onChange: (value: unknown) => void;
}
