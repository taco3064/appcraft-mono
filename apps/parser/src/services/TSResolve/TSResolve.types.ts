import type TsMorph from 'ts-morph';

enum PropType {
  any,
  arrayOf,
  bool,
  element,
  elementType,
  exact,
  func,
  instanceOf,
  node,
  number,
  objectOf,
  oneOf,
  oneOfType,
  string,
  // symbol,
}

interface GeneratorOptions {
  name: string;
  required: boolean;
}

export interface ResolveOptions {
  tsFilePath: string;
  name?: string;
  tsConfigDirPath: string;
}

export interface BaseProptype<T extends keyof typeof PropType, O = undefined> {
  name: string;
  required: boolean;
  type: T;
  options?: O;
}

type AnyProp = BaseProptype<'any'>;
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
  | AnyProp
  | ArrayOfProp
  | BoolProp
  | ExactProp
  | FuncProp
  | NodeProp
  | NumberProp
  | OneOfProp
  | OneOfTypeProp
  | StringProp;

//* Methods
export type BaseGenerator<R = PropTypesDef> = (
  type: TsMorph.Type,
  options: GeneratorOptions,
  source: TsMorph.SourceFile
) => R | false;

export type Generators = [
  BaseGenerator<NodeProp>,
  BaseGenerator<AnyProp>,
  BaseGenerator<BoolProp>,
  BaseGenerator<NumberProp>,
  BaseGenerator<StringProp>,
  BaseGenerator<FuncProp>,
  BaseGenerator<ArrayOfProp>,
  BaseGenerator<ArrayOfProp>,
  BaseGenerator<ExactProp>,
  BaseGenerator<OneOfProp | OneOfTypeProp>
];

export type PrivateGetVirtualSource = (
  project: TsMorph.Project,
  filePath: string,
  name: string
) => [string, TsMorph.SourceFile];

export type PrivateResolveInterface = (
  source: TsMorph.SourceFile,
  declaration: TsMorph.InterfaceDeclaration
) => PropTypesDef[];

export type Resolve = (options: ResolveOptions) => PropTypesDef[];
