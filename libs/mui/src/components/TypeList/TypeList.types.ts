import type { BasicType } from '../../hooks';
import type { TypeItemProps } from '../TypeItem';

export interface TypeListProps extends Pick<TypeItemProps, 'disableSelection'> {
  superior: BasicType;
  values: object;
  onPropPathChange: (propPath: string) => void;
}
