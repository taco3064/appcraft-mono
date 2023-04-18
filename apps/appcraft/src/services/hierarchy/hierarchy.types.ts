import type { QueryFunction } from '@tanstack/react-query';
import type * as Types from '@appcraft/types';

export type HierarchyData<U = undefined> = Omit<
  Types.HierarchyData<U>,
  'userid'
>;

export type HierarchyParams = Types.HierarchyParams;

export type SearchHierarchyService = QueryFunction<
  HierarchyData<string>[],
  readonly [string, Types.HierarchyParams]
>;

export type GetHierarchyNamesService = QueryFunction<
  Record<string, string>,
  readonly [string, string[]]
>;

export type AddHierarchyService = (
  data: Omit<HierarchyData, '_id'>
) => Promise<HierarchyData<string>>;

export type UpdateHierarchyService = (
  data: HierarchyData<string>
) => Promise<HierarchyData<string>>;

export type RemoveHierarchyService = (
  data: HierarchyData<string>
) => Promise<void>;
