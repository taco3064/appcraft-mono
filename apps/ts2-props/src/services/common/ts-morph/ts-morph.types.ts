import type { SourceFile, Type } from 'ts-morph';
import type * as Appcraft from '@appcraft/types';

export type TypeResult = [Type, Appcraft.GeneratorInfo] | null;

export type GetMixedTypeByPath = (
  mixedTypes: Appcraft.TypesParseOptions['mixedTypes'],
  paths: string[]
) => string | null;

export type GetSourceAndType = (
  options: Appcraft.TypesParseOptions
) => [SourceFile, Type];

export type GetTypeByPath = (
  type: Type,
  options: {
    readonly info: Appcraft.GeneratorInfo; //* 當前層級的資訊，當 type 與路徑吻合時，會將此資訊回傳
    mixedTypes: Appcraft.TypesParseOptions['mixedTypes']; //* 已明確指定的型別
    source: SourceFile; //* 目標型態所屬的檔案
    paths: string[]; //* 目標路徑
    superior?: string[]; //* 上一層路徑
  }
) => TypeResult;
