import type { ObjectId } from 'mongodb';
import type * as Appcraft from '@appcraft/types';

export type HierarchyParams = Appcraft.HierarchyParams;
export type HierarchyData<U = undefined> = Appcraft.HierarchyData<U>;

export type SearchService = (
  userid: string,
  parasm: HierarchyParams & { category?: string }
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

export type RemoveService = (
  userid: string,
  dataid: string
) => Promise<unknown>;
