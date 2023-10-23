import type TsMorph from 'ts-morph';
import type * as Appcraft from '@appcraft/types';

export type Generators = [
  GetProptypeUtil<Appcraft.OneOfProp>,
  GetProptypeUtil<Appcraft.BoolProp>,
  GetProptypeUtil<Appcraft.NumberProp>,
  GetProptypeUtil<Appcraft.StringProp>,
  GetProptypeUtil<Appcraft.ElementProp | Appcraft.NodeProp>,
  GetProptypeUtil<Appcraft.InstanceOfProp>,
  GetProptypeUtil<Appcraft.FuncProp>,
  GetProptypeUtil<Appcraft.PropTypesDef>,
  GetProptypeUtil<Appcraft.ArrayProp | Appcraft.ArrayOfProp>,
  GetProptypeUtil<
    Appcraft.ExactProp | Appcraft.ObjectProp | Appcraft.ObjectOfProp
  >
];

//* Methods
export type GetProptypeUtil<R = Appcraft.PropTypesDef> = (
  type: TsMorph.Type,
  info: Appcraft.GeneratorInfo,
  options: {
    counts: Map<string, number>;
    source?: TsMorph.SourceFile;
  }
) => R | false;

export type FindNodesAndEventsPropsUtil = (
  source: TsMorph.SourceFile,
  type: TsMorph.Type,
  options: {
    counts: Map<string, number>;
    info: Appcraft.GeneratorInfo;
    paths?: string[];
  }
) => {
  nodes?: Appcraft.ChildNodes;
  events?: string[];
};

export type ParseService = (
  options: Appcraft.TypesParseOptions
) => Appcraft.PropTypesDef | null;

export type GetNodesAndEvents = (
  options: Pick<Appcraft.TypesParseOptions, 'typeFile' | 'typeName'>[]
) => Appcraft.NodeAndEventProps;
