import type { QueryFunctionContext } from '@tanstack/react-query';
import type { ConfigOptions, NodeWidget } from '@appcraft/types';

export type FindConfigContext = QueryFunctionContext<
  readonly [string] | readonly [string, string]
>;

export type ConfigValues = ConfigOptions | NodeWidget;
export type RemoveConfigService = (id: string) => Promise<void>;
