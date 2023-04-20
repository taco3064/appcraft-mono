import type { Dispatch, RefObject, ReactNode } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

export type InputStyles = Pick<TextFieldProps, 'color' | 'size' | 'variant'>;

export type CompleteValue<V extends object = object> = Required<
  InteractivedValue<V>
> & {
  InputStyles: Required<InputStyles>;
};

export interface InteractivedProviderProps<V extends object = object> {
  InputStyles?: Partial<InputStyles>;
  children: ReactNode;
  propPath: string;
  values: V;
  onChange: (values: V) => void;
}

export interface InteractivedValue<V extends object = object>
  extends Pick<InteractivedProviderProps<V>, 'InputStyles' | 'propPath'> {
  valuesRef?: RefObject<[V, (values: V) => void]>;
}

export type ContextHook = () => CompleteValue;

export type ProviderValueHook = <V extends object = object>(
  props: Pick<
    InteractivedProviderProps<V>,
    'InputStyles' | 'propPath' | 'values' | 'onChange'
  >
) => CompleteValue<V>;

export type InputStylesHook = () => CompleteValue['InputStyles'];
export type PropPathHook = () => CompleteValue['propPath'];
export type PropValueHook = <V>(propName?: string) => [V, (value: V) => void];
