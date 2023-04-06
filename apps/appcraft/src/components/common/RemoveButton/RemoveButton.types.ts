import type { CommonButtonProps } from '../CommonButton';

export type RemoveButtonProps = Omit<CommonButtonProps, 'icon' | 'text'> &
  Partial<Pick<CommonButtonProps, 'icon' | 'text'>> & {
    onConfirm: () => Promise<void>;
  };
