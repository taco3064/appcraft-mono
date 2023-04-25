import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import type * as Appcraft from '@appcraft/types';

export type ConfigData<C extends object, U = undefined> = Appcraft.ConfigData<
  C,
  U
>;

export type FindConfigContext = QueryFunctionContext<
  readonly [string] | readonly [string, string]
>;
export type RemoveConfigService = (id: string) => Promise<void>;
