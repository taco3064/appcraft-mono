import type TsMorph from 'ts-morph';

enum PropType {
  //! 不需要 any, array, elementType, symbol,

  //* 已確認
  arrayOf,
  bool,
  element,
  exact,
  func,
  instanceOf,
  node,
  number,
  object,
  objectOf,
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
type ElementProp = BaseProptype<'element'>;
type ExactProp = BaseProptype<'exact', Record<string, PropTypesDef>>;
type InstanceOfProp = BaseProptype<'instanceOf', string>;
type NodeProp = BaseProptype<'node'>;
type NumberProp = BaseProptype<'number'>;
type ObjectProp = BaseProptype<'object'>;
type ObjectOfProp = BaseProptype<'objectOf', PropTypesDef>;
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
  | ElementProp
  | ExactProp
  | FuncProp
  | InstanceOfProp
  | NodeProp
  | NumberProp
  | ObjectProp
  | ObjectOfProp
  | OneOfProp
  | OneOfTypeProp
  | StringProp;

export type Generators = [
  PrivateGetProptype<BoolProp>,
  PrivateGetProptype<NumberProp>,
  PrivateGetProptype<StringProp>,
  PrivateGetProptype<ElementProp | NodeProp>,
  PrivateGetProptype<InstanceOfProp>,
  PrivateGetProptype<FuncProp>,
  PrivateGetProptype<ArrayOfProp>,
  PrivateGetProptype<ExactProp | ObjectProp | ObjectOfProp>,
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
