import type { DBSchema } from 'idb';
import type { ChildNodes } from './widget.types';

export type AppcraftStores = {
  events: {
    key: string;
    value: string[];
  };
  nodes: {
    key: string;
    value: ChildNodes;
  };
};

export type AppcraftDB = DBSchema & AppcraftStores;
