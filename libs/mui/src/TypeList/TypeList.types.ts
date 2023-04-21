import type * as Appcraft from '@appcraft/types';

export interface TypeListProps {
  superior:
    | Appcraft.ArrayOfProp
    | Appcraft.ExactProp
    | Appcraft.ObjectOfProp
    | Appcraft.ObjectProp;

  onPropPathChange: (propPath: string) => void;
}
