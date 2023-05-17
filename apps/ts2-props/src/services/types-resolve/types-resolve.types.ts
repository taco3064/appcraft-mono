import type TsMorph from 'ts-morph';
import type * as Appcraft from '@appcraft/types';

export type Generators = [
  PrivateGetProptype<Appcraft.OneOfProp>,
  PrivateGetProptype<Appcraft.BoolProp>,
  PrivateGetProptype<Appcraft.NumberProp>,
  PrivateGetProptype<Appcraft.StringProp>,
  PrivateGetProptype<Appcraft.ElementProp | Appcraft.NodeProp>,
  PrivateGetProptype<Appcraft.InstanceOfProp>,
  PrivateGetProptype<Appcraft.FuncProp>,
  PrivateGetProptype<Appcraft.ArrayOfProp>,
  PrivateGetProptype<
    Appcraft.ExactProp | Appcraft.ObjectProp | Appcraft.ObjectOfProp
  >,
  PrivateGetProptype<Appcraft.PropTypesDef>
];

export type TypeResult = [TsMorph.Type, Appcraft.GeneratorInfo] | null;

type DeclarationInfo = [
  TsMorph.SourceFile,
  TsMorph.InterfaceDeclaration | TsMorph.TypeAliasDeclaration
];

export type QueueMap = Map<
  string,
  {
    info: DeclarationInfo;
    destroy: () => void;
  }
>;

//* Methods
export type PrivateGetDeclarationInfo = (
  options: Omit<Appcraft.TypesParseOptions, 'superior'>
) => DeclarationInfo;

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
