import type { DBSchema } from 'idb';
import type { ChildNodes } from './widget.types';

export interface AppcraftDB extends DBSchema {
  events: {
    key: string;
    value: string[];
  };
  nodes: {
    key: string;
    value: ChildNodes;
  };
}
