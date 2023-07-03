import type { MutableRefObject, ReactNode } from 'react';
import type * as Appcraft from '@appcraft/types';

//* Variable
export type ChangeHandler<E extends OptionValues> = (e: E) => void;
export type FixedT = (key: string, options?: object) => string;

export type OptionValues =
  | Appcraft.NodeWidget
  | Appcraft.ConfigOptions
  | Appcraft.RootNodeWidget;

//* Context Value
export interface EditorContextValue<V extends OptionValues> {
  collectionPath: string;
  fixedT?: FixedT;
  values?: V;
  handleChangeRef?: MutableRefObject<ChangeHandler<V>>;
}

//* Provider Props
export interface EditorProviderProps<V extends OptionValues>
  extends Omit<EditorContextValue<V>, 'handleChangeRef'> {
  children: ReactNode;
  onChange: ChangeHandler<V>;
}
