import type { IconProps } from '@mui/material/Icon';
import type * as Types from '../CommonButton';

type RemoveGenericProps<T extends Types.CommonButtonVariant> = Omit<
  Types.CommonGenericProps<T>,
  'icon' | 'text'
> &
  Partial<Pick<Types.CommonGenericProps<T>, 'icon' | 'text'>> & {
    IconProps?: IconProps;
    onCancel?: () => void;
    onConfirm: () => Promise<void> | void;
  };

export type RemoveButtonProps =
  | RemoveGenericProps<'text'>
  | RemoveGenericProps<'icon'>
  | RemoveGenericProps<'menu'>;
