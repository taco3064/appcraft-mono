import type { ObjectId } from 'mongodb';
import type { HierarchyData, SearchParams } from '~types/hierarchy';

export type SearchService = (
  userid: string,
  category: string,
  parasm: SearchParams
) => Promise<HierarchyData<ObjectId>[]>;

export type AddService = (
  userid: string,
  data: HierarchyData
) => Promise<HierarchyData<ObjectId>>;
