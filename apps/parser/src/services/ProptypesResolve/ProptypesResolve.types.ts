import type TsMorph from 'ts-morph';

enum PropType {
  //! 不需要
  // any,
  // symbol,

  //? 尚未研究怎麼判斷
  element,
  elementType,
  instanceOf,
  objectOf,

  //* 已確認
  arrayOf,
  bool,
  exact,
  func,
  node,
  number,
  oneOf,
  oneOfType,
  string,
}

interface GeneratorInfo {
  name?: string;
  required: boolean;
}

export interface BaseProptype<T extends keyof typeof PropType, O = undefined>
  extends GeneratorInfo {
  type: T;
  options?: O;
}

type ArrayOfProp = BaseProptype<'arrayOf', PropTypesDef>;
type BoolProp = BaseProptype<'bool'>;
type ExactProp = BaseProptype<'exact', Record<string, PropTypesDef>>;
type NodeProp = BaseProptype<'node'>;
type NumberProp = BaseProptype<'number'>;
type OneOfProp = BaseProptype<'oneOf', (boolean | number | string)[]>;
type OneOfTypeProp = Omit<BaseProptype<'oneOfType', PropTypesDef[]>, 'name'>;
type StringProp = BaseProptype<'string'>;
type FuncProp = BaseProptype<
  'func',
  { params: PropTypesDef[]; return?: PropTypesDef }
>;

export type PropTypesDef =
  | ArrayOfProp
  | BoolProp
  | ExactProp
  | FuncProp
  | NodeProp
  | NumberProp
  | OneOfProp
  | OneOfTypeProp
  | StringProp;

export type Generators = [
  PrivateGetProptype<NodeProp>,
  PrivateGetProptype<BoolProp>,
  PrivateGetProptype<NumberProp>,
  PrivateGetProptype<StringProp>,
  PrivateGetProptype<FuncProp>,
  PrivateGetProptype<ArrayOfProp>,
  PrivateGetProptype<ArrayOfProp>,
  PrivateGetProptype<ExactProp>,
  PrivateGetProptype<OneOfProp | OneOfTypeProp>
];

export interface ParseOptions {
  tsconfigDir: string;
  tsFile: string;
  propsType: string;
  superior?: string;
}

export interface ParseResult {
  superiorType: 'array' | 'object';
  superior: string;
  proptypes: PropTypesDef;
}

//* Methods
export type PrivateGetProptype<R = PropTypesDef> = (
  type: TsMorph.Type,
  options: GeneratorInfo
) => R | void;

export type PrivateGetVirtualSource = (
  options: Omit<ParseOptions, 'superior'>
) => [TsMorph.SourceFile, TsMorph.InterfaceDeclaration];

export type PrivateResolveByPaths = (
  properties: TsMorph.Symbol[],
  options: {
    readonly required: boolean;
    readonly superior: string;
    paths: string[];
    source: TsMorph.SourceFile;
    superiorType: ParseResult['superiorType'];
  }
) => ParseResult | null;

export type Parse = (options: ParseOptions) => ParseResult | null;
