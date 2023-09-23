import type { CommonButtonProps } from '../CommonButton';
import type { Navigation } from '~appcraft/hooks';

//* Variables
export type Links = Navigation['links'];

//* Component Props
export interface AnchorLinksButtonProps
  extends Partial<Pick<CommonButtonProps, 'btnVariant'>> {
  CommonButtonProps?: Omit<
    CommonButtonProps,
    'btnVariant' | 'icon' | 'text' | 'onClick'
  >;

  value?: Links;
  onCancel?: () => void;
  onConfirm: (value: Links) => void;
}
