import type { ObjectId } from 'mongodb';
import type * as Types from '@appcraft/types';

export type SearchParams = Types.SearchParams;
export type HierarchyData<U = undefined> = Types.HierarchyData<U>;

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
