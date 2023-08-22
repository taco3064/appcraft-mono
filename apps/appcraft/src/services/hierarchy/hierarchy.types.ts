import type { QueryFunction } from '@tanstack/react-query';
import type * as Appcraft from '@appcraft/types';

export type HierarchyData<U = undefined> = Omit<
  Appcraft.HierarchyData<U>,
  'userid'
>;

export type HierarchyParams = Appcraft.HierarchyParams;

export type SearchHierarchyService = QueryFunction<
  HierarchyData<string>[],
  readonly [string] | readonly [string, Appcraft.HierarchyParams]
>;

export type GetHierarchyNamesService = QueryFunction<
  Record<string, string>,
  readonly [string, string[]]
>;

export type AddHierarchyService = (
  data: HierarchyData
) => Promise<HierarchyData<string>>;

export type UpdateHierarchyService = (
  data: HierarchyData<string>
) => Promise<HierarchyData<string>>;

export type RemoveHierarchyService = (id: string) => Promise<void>;
