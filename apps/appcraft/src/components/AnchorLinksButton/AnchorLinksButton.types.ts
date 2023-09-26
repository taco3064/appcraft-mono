import type { AnchorLinksListProps } from '../AnchorLinksList';
import type { CommonButtonProps } from '../CommonButton';
import type { BaseOption, Links, Navigation } from '~appcraft/hooks';

//* Component Props
export type LazyAnchorLinksListProps = Omit<
  AnchorLinksListProps,
  'getWidgetOptions'
>;

export interface AnchorLinksButtonProps
  extends Partial<Pick<CommonButtonProps, 'btnVariant'>> {
  CommonButtonProps?: Omit<
    CommonButtonProps,
    'btnVariant' | 'icon' | 'text' | 'onClick'
  >;

  id: { nav: string; page: string };
  pages: BaseOption[];
  value: Navigation;

  onCancel?: () => void;
  onConfirm: (value: Links) => void;
}
