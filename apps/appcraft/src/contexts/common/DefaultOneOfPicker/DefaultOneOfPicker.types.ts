import type { OneOfProp } from '@appcraft/types';

type Value = OneOfProp['options'][number];

export interface DefaultOneOfPickerProps {
  disabled?: boolean;
  label: string;
  options: OneOfProp;
  value?: Value;
  onChange?: (value: Value) => void;
}
