import TextField from '@mui/material/TextField';
import type * as Appcraft from '@appcraft/types';
import type * as React from 'react';

import type { PropPathRouterHandler } from '../../hooks';

//* Variables
export type ChangeHandler<E extends OptionValues> = (e: E) => void;
export type OptionValues = Appcraft.NodeWidget | Appcraft.ConfigOptions;

export type DisplayProp =
  | Appcraft.ArrayOfProp
  | Appcraft.ExactProp
  | Appcraft.FuncProp
  | Appcraft.ObjectProp
  | Appcraft.ObjectOfProp;

export type MixedProp = Appcraft.OneOfTypeProp;

export type PureProp =
  | Appcraft.BoolProp
  | Appcraft.InstanceOfProp
  | Appcraft.NumberProp
  | Appcraft.OneOfProp
  | Appcraft.StringProp;

export type RenderOverrideItemArgs<C extends 'display' | 'pure'> = [
  C,
  {
    disabled: boolean;
    propPath: string;
    label: string;
    typeFile: string;
    typeName: string;
    props?: object;
    value: unknown;
    onChange: (e: unknown) => void;
    options: C extends 'display' ? DisplayProp : PureProp;

    displayRef?: C extends 'display'
      ? React.MutableRefObject<PropPathRouterHandler>
      : never;
  }
];

export type RenderOverrideItem = (
  ...args: RenderOverrideItemArgs<'display'> | RenderOverrideItemArgs<'pure'>
) => React.ReactNode;

export type OverrideMixedOptions = (options: {
  propPath: string;
  typeFile: string;
  typeName: string;
  options: MixedProp;
  values: unknown;
}) => MixedProp | void;

export type OverrideNamingProps = (options: {
  propPath: string;
  typeFile: string;
  typeName: string;
  values: unknown;
}) => Promise<Pick<
  React.ComponentProps<typeof TextField>,
  'select' | 'children' | 'disabled'
> | void>;

//* Context Value
export interface EditorContextValue<V extends OptionValues> {
  collectionPath: string;
  values?: V;
  handleChangeRef?: React.MutableRefObject<ChangeHandler<V>>;

  overrideMixedOptionsRef?: React.MutableRefObject<
    OverrideMixedOptions | undefined
  >;
  overrideNamingPropsRef?: React.MutableRefObject<
    OverrideNamingProps | undefined
  >;
  renderOverrideItemRef?: React.MutableRefObject<
    RenderOverrideItem | undefined
  >;
}

//* Provider Props
export interface EditorProviderProps<V extends OptionValues>
  extends Omit<
    EditorContextValue<V>,
    'handleChangeRef' | 'overrideNamingPropsRef' | 'renderOverrideItemRef'
  > {
  children: React.ReactNode;
  overrideMixedOptions?: OverrideMixedOptions;
  overrideNamingProps?: OverrideNamingProps;
  renderOverrideItem?: RenderOverrideItem;
  onChange: ChangeHandler<V>;
}
