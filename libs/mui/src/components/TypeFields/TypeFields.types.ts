import type * as Appcraft from '@appcraft/types';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';

enum FieldType {
  Display,
  Mixed,
  // Node,
  Pure,
}

export type Category = keyof typeof FieldType;
export type BoolInputProps = FormControlLabelProps;

interface BaseFieldProps<P extends Appcraft.PropTypesDef> {
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

// export type NodeFieldProps = BaseFieldProps<
//   Appcraft.ElementProp | Appcraft.NodeProp
// >;

export type PureFieldProps = BaseFieldProps<
  | Appcraft.BoolProp
  | Appcraft.InstanceOfProp
  | Appcraft.NumberProp
  | Appcraft.OneOfProp
  | Appcraft.StringProp
>;

export type DisplayPropNameHook = (propName?: string) => string;
