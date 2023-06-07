import type { ReactNode } from 'react';
import type * as Appcraft from '@appcraft/types';

//* Variable
export type ChangeHandler<F extends keyof Appcraft.NodeWidget> = (
  widgetField: F,
  values: Appcraft.NodeWidget[F] | null
) => void;

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
  mixedTypes?: Appcraft.TypesMapping;
  collectionPath: string;
  values: Partial<Pick<Appcraft.NodeWidget, Appcraft.WidgetField>>;

  onChange: ChangeHandler<Appcraft.WidgetField>;
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

export type CollectionHook = (defaultValues?: Collection) => {
  path: string;
  source: object;
  values: Collection;
};

export type PropValueHook = <V>(
  collectionType: Appcraft.CollectionType,
  widgetField: Appcraft.WidgetField,
  propName: string
) => {
  path: string;
  value: V;
  onChange: (value: V) => void;
};

export type MixedTypeMapping = (
  collectionType: Appcraft.CollectionType,
  widgetField: Appcraft.WidgetField,
  propName: string
) => MixedTypeMappingResult;
