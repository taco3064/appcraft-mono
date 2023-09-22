import type { Website } from '@appcraft/types';

import type { BaseOption } from '~appcraft/hooks';
import type { CommonButtonProps } from '~appcraft/components';

//* Variables
export type Page = Website['pages'][number];

//* Component Props
export interface PageMutationButtonProps
  extends Partial<Pick<CommonButtonProps, 'btnVariant'>> {
  CommonButtonProps?: Omit<
    CommonButtonProps,
    'btnVariant' | 'icon' | 'text' | 'onClick'
  >;

  mode: 'add' | 'update';
  data?: Partial<Page>;
  options: BaseOption[];
  onCancel?: () => void;
  onConfirm: (data: Page) => void;
}
