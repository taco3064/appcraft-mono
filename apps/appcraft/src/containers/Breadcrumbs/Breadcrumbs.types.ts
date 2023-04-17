import type { ToolbarProps } from '@mui/material/Toolbar';
import type { UrlObject } from 'url';

export interface Breadcrumb {
  text: string;
  url?: string | UrlObject;
}

export interface BreadcrumbsProps {
  ToolbarProps?: ToolbarProps;
  breadcrumbs?: Record<string, Breadcrumb>;
  stretches?: Breadcrumb[];
}
