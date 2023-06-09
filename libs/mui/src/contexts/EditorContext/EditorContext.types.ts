import type { ReactNode } from 'react';
import type * as Appcraft from '@appcraft/types';

//* Variable
export type ChangeHandler = (e: Appcraft.NodeWidget | null) => void;

export type MixedTypeMappingResult = [
  string | null,
  (mixedText?: string) => void
];

export type Replaces = {
  pattern: RegExp;
  replacement: string | ((match: string, ...args: string[]) => string);
}[];

export type Collection = Array<unknown> | Record<string, unknown>;

//* Context Value
export interface EditorContextValue {
  fixedT?: (key: string, options?: object) => string;
  collectionPath: string;
  values?: Appcraft.NodeWidget;
  onChange: ChangeHandler;
}

//* Provider Props
export interface EditorProviderProps extends EditorContextValue {
  children: ReactNode;
}

//* Custom Hook
export type FixedTHook = (
  defaultFixedT?: EditorProviderProps['fixedT']
) => Required<EditorProviderProps>['fixedT'];

export type CollectionHook = (defaultValues?: Collection) => {
  path: string;
  source: object;
  values: Collection;
};

export type MixedTypeMapping = (
  collectionType: Appcraft.CollectionType,
  widgetField: Appcraft.WidgetField,
  propName: string
) => MixedTypeMappingResult;
