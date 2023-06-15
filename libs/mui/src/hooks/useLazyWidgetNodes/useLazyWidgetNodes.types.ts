import type * as Appcraft from '@appcraft/types';

export type ParseOptions = Pick<
  Appcraft.TypesParseOptions,
  'typeFile' | 'typeName'
>;

export type RenderFn<D, R> = (
  options: R & {
    fetchData: D;
    widgets: Appcraft.WidgetOptions[];
  }
) => JSX.Element;
