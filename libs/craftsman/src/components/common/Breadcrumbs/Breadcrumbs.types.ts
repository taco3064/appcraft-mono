import type { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs';
import type { ComponentProps, ReactElement } from 'react';

import { Breadcrumb } from '../../../styles';

export type MenuOptions = { primary: string; value: () => void }[];

export interface BreadcrumbsProps
  extends Omit<
    MuiBreadcrumbsProps,
    'children' | 'itemsBeforeCollapse' | 'slotProps'
  > {
  collapsedTitle?: string;
  children?: ReactElement<ComponentProps<typeof Breadcrumb>>[];

  TopProps?: {
    text: string;
    onClick: () => void;
  };
}
