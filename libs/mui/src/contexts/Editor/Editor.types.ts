import type { MutableRefObject, ReactNode } from 'react';
import type * as Appcraft from '@appcraft/types';

//* Variables
export type ChangeHandler<E extends OptionValues> = (e: E) => void;
export type FixedT = (key: string, options?: object) => string;
export type OptionValues = Appcraft.NodeWidget | Appcraft.ConfigOptions;

export type PureProp =
  | Appcraft.BoolProp
  | Appcraft.InstanceOfProp
  | Appcraft.NumberProp
  | Appcraft.OneOfProp
  | Appcraft.StringProp;

export type RenderOverridePureItem = (props: {
  disabled: boolean;
  propPath: string;
  label: string;
  options: PureProp;
  typeFile: string;
  typeName: string;
  value: unknown;
  onChange: (e: unknown) => void;
}) => ReactNode;

//* Context Value
export interface EditorContextValue<V extends OptionValues> {
  collectionPath: string;
  fixedT?: FixedT;
  values?: V;
  handleChangeRef?: MutableRefObject<ChangeHandler<V>>;

  renderOverridePureItemRef?: MutableRefObject<
    RenderOverridePureItem | undefined
  >;
}

//* Provider Props
export interface EditorProviderProps<V extends OptionValues>
  extends Omit<
    EditorContextValue<V>,
    'handleChangeRef' | 'renderOverridePureItemRef'
  > {
  children: ReactNode;
  renderOverridePureItem?: RenderOverridePureItem;
  onChange: ChangeHandler<V>;
}
