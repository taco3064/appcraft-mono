import type TsMorph from 'ts-morph';
import type * as Appcraft from '@appcraft/types';

export type Generators = [
  UtilGetProptype<Appcraft.OneOfProp>,
  UtilGetProptype<Appcraft.BoolProp>,
  UtilGetProptype<Appcraft.NumberProp>,
  UtilGetProptype<Appcraft.StringProp>,
  UtilGetProptype<Appcraft.ElementProp | Appcraft.NodeProp>,
  UtilGetProptype<Appcraft.InstanceOfProp>,
  UtilGetProptype<Appcraft.FuncProp>,
  UtilGetProptype<Appcraft.PropTypesDef>,
  UtilGetProptype<Appcraft.ArrayOfProp>,
  UtilGetProptype<
    Appcraft.ExactProp | Appcraft.ObjectProp | Appcraft.ObjectOfProp
  >
];

//* Methods
export type UtilGetProptype<R = Appcraft.PropTypesDef> = (
  type: TsMorph.Type,
  info: Appcraft.GeneratorInfo,
  source?: TsMorph.SourceFile
) => R | false;

export type ParseService = (
  options: Appcraft.TypesParseOptions
) => Appcraft.PropTypesDef | null;
