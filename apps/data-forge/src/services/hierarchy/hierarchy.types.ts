import type { ObjectId } from 'mongodb';

export interface SearchParams {
  keyword?: string;
  superior?: string;
}

export interface HierarchyData<U = undefined> {
  _id: U;
  category: string;
  description?: string;
  name: string;
  superior?: string;
  type: 'group' | 'item';
}

export type SearchService = (
  category: string,
  parasm: SearchParams
) => Promise<HierarchyData<ObjectId>[]>;

export type AddService = (
  data: HierarchyData
) => Promise<HierarchyData<ObjectId>>;
