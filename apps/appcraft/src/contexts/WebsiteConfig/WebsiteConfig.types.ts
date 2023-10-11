import type { ReactNode } from 'react';
import type { WebsiteConfig } from '@appcraft/types';

import type { Navigation } from '~appcraft/hooks';

//* Variables
type NavRoute = Omit<Navigation, 'routes'>;

//* Methods
export type GetHomePageFn = (
  id: string,
  routes: Navigation[],
  superior?: string
) => Navigation | undefined;

export type GetRoutesFn = (
  routes: Navigation[],
  pathname: string[]
) => NavRoute[];

//* Custom Hooks
export type WebsiteConfigHook = () => {
  config: WebsiteConfig;
  homepage?: Navigation;
  routes?: NavRoute[];
};

//* Provider Component Props
export interface WebsiteConfigProviderProps {
  children: ReactNode;
  config: WebsiteConfig;
}
