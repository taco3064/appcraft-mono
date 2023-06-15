import type { ReactNode } from 'react';
import type * as Appcraft from '@appcraft/types';

//* Variable
export type OptionValues = Appcraft.NodeWidget | Appcraft.ConfigOptions;
export type ChangeHandler<E extends OptionValues> = (e: E) => void;

export type MixedTypeMappingResult = [
  string | null,
  (mixedText?: string) => void
];

export type Replaces = {
  pattern: RegExp;
  replacement: string | ((match: string, ...args: string[]) => string);
}[];

export type Collection = Array<unknown> | Record<string, unknown>;
export type FixedT = (key: string, options?: object) => string;

//* Context Value
export interface EditorContextValue<V extends OptionValues> {
  collectionPath: string;
  fixedT?: FixedT;
  values?: V;
  onChange: ChangeHandler<V>;
}

//* Provider Props
export interface EditorProviderProps<V extends OptionValues>
  extends EditorContextValue<V> {
  children: ReactNode;
}

//* Custom Hook
export type MixedTypeMapping = (
  collectionType: Appcraft.CollectionType,
  widgetField: Appcraft.WidgetField,
  propName: string
) => MixedTypeMappingResult;
