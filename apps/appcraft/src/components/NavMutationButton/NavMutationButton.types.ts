import type { BaseOption, Navigation } from '~appcraft/hooks';
import type { CommonButtonProps } from '../CommonButton';

//* Component Props
export interface NavMutationButtonProps
  extends Partial<Pick<CommonButtonProps, 'btnVariant'>> {
  CommonButtonProps?: Omit<
    CommonButtonProps,
    'btnVariant' | 'icon' | 'text' | 'onClick'
  >;

  mode: 'add' | 'update';
  data?: Partial<Navigation>;
  options: BaseOption[];
  onCancel?: () => void;
  onConfirm: (data: Navigation) => void;
}
