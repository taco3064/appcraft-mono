import type { CommonButtonProps } from '~appcraft/components/common';

export type RemoveButtonProps = Omit<CommonButtonProps, 'icon' | 'text'> &
  Partial<Pick<CommonButtonProps, 'icon' | 'text'>> & {
    onCancel?: () => void;
    onConfirm: () => Promise<void> | void;
  };
