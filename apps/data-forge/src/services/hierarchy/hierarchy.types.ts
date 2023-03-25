import type { ObjectId } from 'mongodb';

export interface SearchParams {
  keyword?: string;
  superior?: string;
}

export interface HierarchyData<U = undefined> {
  _id: U;
  userid: string;
  category: string;
  description?: string;
  name: string;
  superior?: string;
  type: 'group' | 'item';
}

export type SearchService = (
  userid: string,
  category: string,
  parasm: SearchParams
) => Promise<HierarchyData<ObjectId>[]>;

export type AddService = (
  userid: string,
  data: HierarchyData
) => Promise<HierarchyData<ObjectId>>;
