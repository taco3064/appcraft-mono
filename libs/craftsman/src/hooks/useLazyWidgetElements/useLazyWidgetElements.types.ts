import type * as Appcraft from '@appcraft/types';

export type ParseOptions = Pick<
  Appcraft.TypesParseOptions,
  'typeFile' | 'typeName'
>;

export type FetchNodesAndEvents = (
  options: ParseOptions[],
  version?: string
) => Promise<Appcraft.NodeAndEventProps>;

export type RenderFn<D, R> = (
  options: R & {
    fetchData: D;
  }
) => JSX.Element;
