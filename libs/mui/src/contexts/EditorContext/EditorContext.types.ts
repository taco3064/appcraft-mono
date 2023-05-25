import type { ReactNode } from 'react';

export type Replaces = {
  pattern: RegExp;
  replacement: string | ((match: string, ...args: string[]) => string);
}[];

export type GetPropPathString = (values: object, paths: string[]) => string;

export type EditorContextValue<V extends object = object> = Required<
  EditorValue<V>
>;

export interface EditorProviderProps<V extends object = object> {
  children: ReactNode;
  propPath: string;
  mixedTypes?: Record<string, string>;
  values: V;
  fixedT?: (key: string, options?: object) => string;
  onChange: (values: V) => void;
  onMixedTypeMapping: (mapping: Record<string, string>) => void;
}

export type EditorValue<V extends object = object> = Pick<
  EditorProviderProps<V>,
  | 'fixedT'
  | 'propPath'
  | 'mixedTypes'
  | 'values'
  | 'onChange'
  | 'onMixedTypeMapping'
>;

export type ContextHook = () => EditorContextValue;
export type PropPathHook = () => EditorContextValue['propPath'];
export type PropValueHook = <V>(propName?: string) => [V, (value: V) => void];

export type FixedTHook = (
  defaultFixedT: EditorProviderProps['fixedT']
) => Required<EditorProviderProps>['fixedT'];

export type MixedTypeMapping = (
  propName?: string
) => [string | null, (mixedText?: string) => void];
