import type { DataSource, TypesParseOptions } from '@appcraft/types';

export type FetchOptions = Pick<DataSource, 'url' | 'method' | 'headers'>;
export type ParseOptions = Pick<TypesParseOptions, 'typeFile' | 'typeName'>;
