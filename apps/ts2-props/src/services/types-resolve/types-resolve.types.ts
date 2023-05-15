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
export type VirtualSource = [TsMorph.SourceFile, TsMorph.InterfaceDeclaration];

//* Methods
export type PrivateGetVirtualSource = (
  options: Omit<Appcraft.TypesParseOptions, 'superior'>
) => VirtualSource;

export type PrivateGetObjectProperty = (
  type: TsMorph.Type,
  propName: string,
  extendTypes?: TsMorph.Type[]
) => TsMorph.Symbol | null;

export type PrivateGetMixedTypeByPath = (
  mixedTypes: Appcraft.TypesParseOptions['mixedTypes'],
  paths: string[]
) => string | null;

export type PrivateGetTypeByPath = (
  type: TsMorph.Type,
  options: {
    readonly info: Appcraft.GeneratorInfo;
    extendTypes?: TsMorph.Type[];
    paths: string[];
    mixedTypes: Appcraft.TypesParseOptions['mixedTypes'];
    source: TsMorph.SourceFile;
    superior?: string[];
  }
) => TypeResult;

export type PrivateGetProptype<R = Appcraft.PropTypesDef> = (
  type: TsMorph.Type,
  info: Appcraft.GeneratorInfo,
  options?: {
    source?: TsMorph.SourceFile;
    filters?: Partial<Appcraft.FilterOptions>;
  }
) => R | false;

export type ParseService = (
  options: Appcraft.TypesParseOptions
) => Appcraft.PropTypesDef | null;
