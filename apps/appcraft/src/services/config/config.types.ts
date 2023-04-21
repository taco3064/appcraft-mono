import type * as Appcraft from '@appcraft/types';

export type ConfigData<C extends object, U = undefined> = Appcraft.ConfigData<
  C,
  U
>;

export type FindConfigQueryKey = { queryKey: readonly [string] };
export type RemoveConfigService = (id: string) => Promise<void>;
