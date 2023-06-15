import type { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs';
import type { ComponentProps, ReactElement } from 'react';

import { Breadcrumb } from '../../../styles';

export interface BreadcrumbsProps
  extends Omit<
    MuiBreadcrumbsProps,
    'children' | 'itemsBeforeCollapse' | 'slotProps'
  > {
  children?: ReactElement<ComponentProps<typeof Breadcrumb>>[];
}
