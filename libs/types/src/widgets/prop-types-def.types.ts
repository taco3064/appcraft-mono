import type { FilterOptions } from './filter-options.types';

export enum PropType {
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

export interface GeneratorInfo {
  propName?: string;
  required: boolean;
}

export interface BaseProptype<T extends keyof typeof PropType, O = undefined>
  extends GeneratorInfo {
  type: T;
  options?: O;
}

export type BoolProp = BaseProptype<'bool'>;
export type ElementProp = BaseProptype<'element'>;
export type ExactProp = BaseProptype<'exact', Record<string, PropTypesDef>>;
export type InstanceOfProp = BaseProptype<'instanceOf', string>;
export type NodeProp = BaseProptype<'node'>;
export type NumberProp = BaseProptype<'number'>;
export type ObjectOfProp = BaseProptype<'objectOf', PropTypesDef>;
export type ObjectProp = BaseProptype<'object'>;
export type OneOfProp = BaseProptype<'oneOf', (boolean | number | string)[]>;
export type StringProp = BaseProptype<'string'>;

export type ArrayOfProp = BaseProptype<
  'arrayOf',
  PropTypesDef | PropTypesDef[]
>;

export type OneOfTypeProp = BaseProptype<
  'oneOfType',
  (PropTypesDef & { text: string })[]
>;

export type FuncProp = BaseProptype<
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

export interface TypesParseOptions {
  typeFile: string;
  typeName: string;
  propPath?: string;
  mixedTypes?: Record<string, string>;
  filters?: FilterOptions;
}
