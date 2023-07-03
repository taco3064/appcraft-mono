import type { DBSchema } from 'idb';
import type { ChildNodes } from './widget.types';
import type * as Def from './prop-types-def.types';

export type StructureProp =
  | Def.ArrayOfProp
  | Def.ExactProp
  | Def.ObjectOfProp
  | Def.ObjectProp;

export type AppcraftStores = {
  events: { key: string; value: string[] };
  nodes: { key: string; value: ChildNodes };
  props: { key: string; value: StructureProp };
};

export type AppcraftDB = DBSchema & AppcraftStores;
