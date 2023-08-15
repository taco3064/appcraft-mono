import type { TypeItem } from '../../../hooks';

export interface TypeItemNamingProps extends Pick<TypeItem, 'onRename'> {
  open: boolean;
  propName?: string;
  selectable: boolean;
  onClose: () => void;
}
