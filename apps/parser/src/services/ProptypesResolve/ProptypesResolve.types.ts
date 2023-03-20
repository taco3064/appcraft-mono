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
  propName?: string;
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
  PrivateGetProptype<ExactProp>,
  PrivateGetProptype<OneOfProp | OneOfTypeProp>
];

export type TypeResult = [TsMorph.Type, GeneratorInfo] | null;

export interface ParseOptions {
  tsconfigDir: string;
  typeFile: string;
  typeName: string;
  propPath?: string;
}

//* Methods
export type PrivateGetVirtualSource = (
  options: Omit<ParseOptions, 'superior'>
) => [TsMorph.SourceFile, TsMorph.InterfaceDeclaration];

export type PrivateGetObjectProperty = (
  type: TsMorph.Type,
  propName: string,
  extendTypes?: TsMorph.Type[]
) => TsMorph.Symbol | null;

export type PrivateGetTypeByPath = (
  type: TsMorph.Type,
  options: {
    readonly info: GeneratorInfo;
    extendTypes?: TsMorph.Type[];
    paths: string[];
    source: TsMorph.SourceFile;
  }
) => TypeResult;

export type PrivateGetProptype<R = PropTypesDef> = (
  type: TsMorph.Type,
  info: GeneratorInfo,
  source?: TsMorph.SourceFile
) => R | false;

export type Parse = (options: ParseOptions) => PropTypesDef | null;
