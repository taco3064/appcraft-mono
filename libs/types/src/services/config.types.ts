import type { ConfigOptions, NodeWidget } from '../widgets';

export interface ConfigData<
  C extends ConfigOptions | NodeWidget,
  U = undefined
> {
  _id: U;
  content: C;
  timestamp: string;
}
