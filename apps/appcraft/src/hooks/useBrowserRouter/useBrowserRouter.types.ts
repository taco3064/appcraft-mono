import type { ReactNode } from 'react';
import type { Router } from '@remix-run/router';
import type { RouteObject } from 'react-router';
import type { Website } from '@appcraft/types';

import type { Navigation } from '../useNavValues';

//* Methods
export type ConvertToRoutersFn = (
  routes: Website['pages'],
  render: (route: Navigation) => ReactNode,
  superior?: string
) => RouteObject[];

export type GetHomePageFn = (
  id: string,
  routes: Website['pages'],
  superior?: string
) => Navigation | null;

//* Custom Hooks
export type BrowserRouterHook = (
  basename: string,
  website: Website | undefined,
  render: (route: Navigation) => ReactNode
) => Router | null;
