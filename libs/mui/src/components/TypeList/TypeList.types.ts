import type * as Appcraft from '@appcraft/types';
import type { TypeItemProps } from '../TypeItem';

export interface TypeListProps extends Pick<TypeItemProps, 'disableSelection'> {
  superior:
    | Appcraft.ArrayOfProp
    | Appcraft.ExactProp
    | Appcraft.ObjectOfProp
    | Appcraft.ObjectProp;

  values: object;
  onPropPathChange: (propPath: string) => void;
}

export type PropPathChangeHook = (
  props: Pick<TypeListProps, 'values' | 'onPropPathChange'>,
  propPath: string
) => [
  {
    name: string;
    isArrayElement: boolean;
    isLast: boolean;
  }[],
  {
    back: (index?: number) => void;
    to: TypeItemProps['onDisplayItemClick'];
  }
];

export type OptionsSortingHook = (
  superior?: TypeListProps['superior']
) => Appcraft.PropTypesDef[];
