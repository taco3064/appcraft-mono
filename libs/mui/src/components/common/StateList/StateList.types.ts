import type { WidgetState } from '@appcraft/types';

export type StateValues = Record<string, WidgetState>;

export interface StateListProps {
  open: boolean;
  state?: StateValues;
}
