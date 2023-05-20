import type TsMorph from 'ts-morph';
import type * as Appcraft from '@appcraft/types';

export type Generators = [
  PrivateGetProptype<Appcraft.OneOfProp>,
  PrivateGetProptype<Appcraft.BoolProp>,
  PrivateGetProptype<Appcraft.NumberProp>,
  PrivateGetProptype<Appcraft.StringProp>,
  PrivateGetProptype<Appcraft.PropTypesDef>,
  PrivateGetProptype<Appcraft.ElementProp | Appcraft.NodeProp>,
  PrivateGetProptype<Appcraft.InstanceOfProp>,
  PrivateGetProptype<Appcraft.FuncProp>,
  PrivateGetProptype<Appcraft.ArrayOfProp>,
  PrivateGetProptype<
    Appcraft.ExactProp | Appcraft.ObjectProp | Appcraft.ObjectOfProp
  >
];

export type TypeResult = [TsMorph.Type, Appcraft.GeneratorInfo] | null;

//* Methods
export type PrivateGetSourceAndBasicType = (
  options: Omit<Appcraft.TypesParseOptions, 'superior'>
) => [TsMorph.SourceFile, TsMorph.Type];

export type PrivateGetMixedTypeByPath = (
  mixedTypes: Appcraft.TypesParseOptions['mixedTypes'],
  paths: string[]
) => string | null;

export type PrivateGetTypeByPath = (
  type: TsMorph.Type,
  options: {
    readonly info: Appcraft.GeneratorInfo;
    paths: string[];
    mixedTypes: Appcraft.TypesParseOptions['mixedTypes'];
    source: TsMorph.SourceFile;
    superior?: string[];
  }
) => TypeResult;

export type PrivateGetProptype<R = Appcraft.PropTypesDef> = (
  type: TsMorph.Type,
  info: Appcraft.GeneratorInfo,
  source?: TsMorph.SourceFile
) => R | false;

export type ParseService = (
  options: Appcraft.TypesParseOptions
) => Appcraft.PropTypesDef | null;
