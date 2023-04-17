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
  parasm: SearchParams & { category?: string }
) => Promise<HierarchyData<ObjectId>[]>;

export type GetNamesService = (
  userid: string,
  category: string,
  ids: string[]
) => Promise<Record<string, string>>;

export type AddService = (
  userid: string,
  data: HierarchyData
) => Promise<HierarchyData<ObjectId>>;

export type UpdateService = (
  userid: string,
  data: HierarchyData<string>
) => Promise<HierarchyData<ObjectId>>;

export type RemoveService = (userid: string, dataid: string) => Promise<void>;
