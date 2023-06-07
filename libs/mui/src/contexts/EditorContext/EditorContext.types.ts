import type { ReactNode } from 'react';
import type { NodeWidget, TypesMapping } from '@appcraft/types';

//* Variable
export type EditedField = 'nodes' | 'props' | 'events';

export type ChangeHandler<F extends keyof NodeWidget> = (
  fieldName: F,
  values: NodeWidget[F] | null
) => void;

export type MixedTypeMappingResult = [
  string | null,
  (mixedText?: string) => void
];

export type Replaces = {
  pattern: RegExp;
  replacement: string | ((match: string, ...args: string[]) => string);
}[];

export type Structure = Array<unknown> | Record<string, unknown>;

//* Context Value
export interface EditorContextValue {
  fixedT?: (key: string, options?: object) => string;
  mixedTypes?: TypesMapping;
  structurePath: string;
  values: Partial<Pick<NodeWidget, EditedField>>;

  onChange: ChangeHandler<EditedField>;
  onMixedTypeMapping: (mapping: Record<string, string>) => void;
}

//* Provider Props
export interface EditorProviderProps extends EditorContextValue {
  children: ReactNode;
}

//* Custom Hook
export type FixedTHook = (
  defaultFixedT?: EditorProviderProps['fixedT']
) => Required<EditorProviderProps>['fixedT'];

export type StructureHook = (defaultValues?: Structure) => {
  path: string;
  source: object;
  values: Structure;
};

export type PropValueHook = <V>(
  widgetFieldName: EditedField,
  propName: string,
  isStructureArray: boolean
) => {
  path: string;
  value: V;
  onChange: (value: V) => void;
};

export type MixedTypeMapping = (
  widgetFieldName: EditedField,
  propName: string,
  isStructureArray: boolean
) => MixedTypeMappingResult;
