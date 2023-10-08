import { createBrowserRouter } from 'react-router-dom';
import { useMemo } from 'react';

import type * as Types from './useBrowserRouter.types';

//* Methods
const convertToRouters: Types.ConvertToRoutersFn = (
  routes,
  renderFn,
  superior = ''
) =>
  routes.map((route) => {
    const { pathname, routes: subRoutes } = route;
    const path = `${superior}${pathname}`;

    return {
      path: path,
      element: renderFn(route),
      ...(subRoutes?.length && {
        children: convertToRouters(subRoutes, renderFn, path),
      }),
    };
  });

export const convertToPathMap: Types.ConvertToPathMapFn = (
  routes,
  result = new Map()
) => {
  routes.forEach((route) => {
    const { pathname, routes: subRoutes } = route;

    result.set(pathname, route);

    if (Array.isArray(subRoutes)) {
      convertToPathMap(subRoutes, result);
    }
  });

  return result;
};

export const getHomePage: Types.GetHomePageFn = (id, routes, superior = '') =>
  routes.reduce((result, { routes: subRoutes, pathname, ...route }) => {
    if (!result) {
      const path = `${superior}${pathname}`;

      if (route.id === id) {
        return {
          ...route,
          pathname: path,
        };
      } else if (Array.isArray(subRoutes)) {
        return getHomePage(id, subRoutes, path);
      }
    }

    return result;
  }, null);

//* Custom Hooks
export const useBrowserRouter: Types.BrowserRouterHook = (
  basename,
  website,
  render
) =>
  useMemo(() => {
    const home = getHomePage(website?.homeid || '', website?.pages || []);

    return !website || !home
      ? null
      : createBrowserRouter(
          [
            { path: '/', element: render(home) },
            ...convertToRouters(website?.pages || [], render),
          ],
          { basename }
        );
  }, [basename, website, render]);
