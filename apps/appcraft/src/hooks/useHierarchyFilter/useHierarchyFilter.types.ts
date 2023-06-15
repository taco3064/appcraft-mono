import type { UrlObject } from 'url';

export interface Breadcrumb {
  text: string;
  url?: string | UrlObject;
}

export type HierarchyFilterHook = (
  category: string,
  itemId?: string
) => {
  breadcrumbs: Breadcrumb[];
  keyword?: string;
  superiors: Record<string, string>;
};
