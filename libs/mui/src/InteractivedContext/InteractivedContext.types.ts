import type { ReactNode } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

export type GetPropPathString = (values: object, paths: string[]) => string;

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
  mixedTypes?: Record<string, string>;
  values: V;
  onChange: (values: V) => void;
  onMixedTypeMapping: (mapping: Record<string, string>) => void;
}

export type InteractivedValue<V extends object = object> = Pick<
  InteractivedProviderProps<V>,
  | 'InputStyles'
  | 'propPath'
  | 'mixedTypes'
  | 'values'
  | 'onChange'
  | 'onMixedTypeMapping'
>;

export type ContextHook = () => CompleteValue;

export type InputStylesHook = () => CompleteValue['InputStyles'];
export type PropPathHook = () => CompleteValue['propPath'];
export type PropValueHook = <V>(propName?: string) => [V, (value: V) => void];

export type MixedTypeMapping = (
  propName?: string
) => [string | null, (mixedText?: string) => void];
