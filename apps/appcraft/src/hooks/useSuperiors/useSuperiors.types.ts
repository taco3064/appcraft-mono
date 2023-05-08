import type { UrlObject } from 'url';

export interface Breadcrumb {
  text: string;
  url?: string | UrlObject;
}

export type SuperiorsHook = (
  category: string,
  itemId?: string
) => {
  breadcrumbs: Breadcrumb[];
  names: Record<string, string>;
  superiors: string[];
};
