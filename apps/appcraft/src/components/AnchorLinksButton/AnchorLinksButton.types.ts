import type { AnchorLinksListProps } from '../AnchorLinksList';
import type { CommonButtonProps } from '../CommonButton';
import type { Navigation } from '~appcraft/hooks';

//* Variables
export type Links = Navigation['links'];

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

  pageid: string;
  value?: Links;

  onCancel?: () => void;
  onConfirm: (value: Links) => void;
}
