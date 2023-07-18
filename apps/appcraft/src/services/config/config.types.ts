import type { QueryFunctionContext } from '@tanstack/react-query';

export type FindConfigContext = QueryFunctionContext<
  readonly [string] | readonly [string, string]
>;

export type RemoveConfigService = (id: string) => Promise<void>;
