import type * as Appcraft from '@appcraft/types';
import type { IconButtonProps } from '@mui/material/IconButton';

import type { NodePickerFn } from '../useNodePicker';
import type { TypeItemProps } from '../TypeItem';

export interface TypeListProps extends Pick<TypeItemProps, 'disableSelection'> {
  ActionButtonProps?: Omit<IconButtonProps, 'children' | 'onClick'>;

  superior:
    | Appcraft.ArrayOfProp
    | Appcraft.ExactProp
    | Appcraft.ObjectOfProp
    | Appcraft.ObjectProp;

  values: object;

  onActionNodePick?: NodePickerFn<'filter'>;
  onFilterToggle: (e: HTMLButtonElement) => void;
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
