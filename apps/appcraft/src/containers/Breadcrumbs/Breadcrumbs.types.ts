import type { ReactNode } from 'react';
import type { ToolbarProps } from '@mui/material/Toolbar';

import type { Breadcrumb } from '~appcraft/hooks';

export type { Breadcrumb };

export interface BreadcrumbsProps {
  ToolbarProps?: ToolbarProps;
  action?: ReactNode;
  disableBackButton?: boolean;
  onCustomize?: (breadcrumbs: Breadcrumb[]) => Breadcrumb[];
}
