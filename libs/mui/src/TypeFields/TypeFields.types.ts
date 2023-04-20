import type * as Appcraft from '@appcraft/types';
import type { SwitchProps } from '@mui/material/Switch';

export type BoolInputProps = SwitchProps & { label: string };

export interface BaseFieldProps<P extends Appcraft.PropTypesDef> {
  options: P;
}

export type DisplayFieldProps = BaseFieldProps<
  | Appcraft.ArrayOfProp
  | Appcraft.ExactProp
  | Appcraft.FuncProp
  | Appcraft.ObjectProp
  | Appcraft.ObjectOfProp
>;

export type MixedFieldProps = BaseFieldProps<Appcraft.OneOfTypeProp>;

export type NodeFieldProps = BaseFieldProps<
  Appcraft.ElementProp | Appcraft.NodeProp
>;

export type PureFieldProps = BaseFieldProps<
  | Appcraft.BoolProp
  | Appcraft.InstanceOfProp
  | Appcraft.NumberProp
  | Appcraft.OneOfProp
  | Appcraft.StringProp
>;
