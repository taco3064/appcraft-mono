import type { MutableRefObject, ReactNode } from 'react';
import type * as Appcraft from '@appcraft/types';

//* Variables
export type ChangeHandler<E extends OptionValues> = (e: E) => void;
export type FixedT = (key: string, options?: object) => string;
export type OptionValues = Appcraft.NodeWidget | Appcraft.ConfigOptions;

export type DisplayProp =
  | Appcraft.ArrayOfProp
  | Appcraft.ExactProp
  | Appcraft.FuncProp
  | Appcraft.ObjectProp
  | Appcraft.ObjectOfProp;

export type PureProp =
  | Appcraft.BoolProp
  | Appcraft.InstanceOfProp
  | Appcraft.NumberProp
  | Appcraft.OneOfProp
  | Appcraft.StringProp;

type RenderOverrideItemArgs<C extends 'display' | 'pure'> = [
  C,
  {
    disabled: boolean;
    propPath: string;
    label: string;
    typeFile: string;
    typeName: string;
    value: unknown;
    onChange: (e: unknown) => void;
    options: C extends 'display' ? DisplayProp : PureProp;
  }
];

export type RenderOverrideItem = (
  ...args: RenderOverrideItemArgs<'display'> | RenderOverrideItemArgs<'pure'>
) => ReactNode;

//* Context Value
export interface EditorContextValue<V extends OptionValues> {
  collectionPath: string;
  fixedT?: FixedT;
  values?: V;
  handleChangeRef?: MutableRefObject<ChangeHandler<V>>;
  renderOverrideItemRef?: MutableRefObject<RenderOverrideItem | undefined>;
}

//* Provider Props
export interface EditorProviderProps<V extends OptionValues>
  extends Omit<
    EditorContextValue<V>,
    'handleChangeRef' | 'renderOverrideItemRef'
  > {
  children: ReactNode;
  renderOverrideItem?: RenderOverrideItem;
  onChange: ChangeHandler<V>;
}
