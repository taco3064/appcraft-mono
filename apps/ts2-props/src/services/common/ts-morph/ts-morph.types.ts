import type { SourceFile, Type } from 'ts-morph';
import type { GeneratorInfo, TypesParseOptions } from '@appcraft/types';

export type TypeResult = [Type, GeneratorInfo] | null;

export type GetMixedTypeByPath = (
  mixedTypes: TypesParseOptions['mixedTypes'],
  paths: string[]
) => string | null;

export type GetSourceAndType = (
  options: Omit<TypesParseOptions, 'superior'>
) => [SourceFile, Type];

export type GetTypeByPath = (
  type: Type,
  options: {
    readonly info: GeneratorInfo;
    paths: string[];
    mixedTypes: TypesParseOptions['mixedTypes'];
    source: SourceFile;
    superior?: string[];
  }
) => TypeResult;
