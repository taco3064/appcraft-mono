import { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import type { WebsiteConfig } from '@appcraft/types';

import type * as Types from './WebsiteConfig.types';

//* Methods
export const getRoute: Types.GetRouteFn = (id, routes, superior = '') =>
  routes.reduce((result, { routes: subRoutes, pathname, ...route }) => {
    if (!result) {
      const path = `${superior}${pathname}`;

      if (route.id === id) {
        return {
          ...route,
          pathname: path,
        };
      } else if (Array.isArray(subRoutes)) {
        return getRoute(id, subRoutes, path);
      }
    }

    return result;
  }, undefined);

const getRoutes: Types.GetRoutesFn = (routes, pathname) => {
  const path = pathname.shift();
  const target = routes.find(({ pathname }) => `/${path}` === pathname);

  if (target) {
    const { routes } = target;

    return [
      target,
      ...(!Array.isArray(routes) ? [] : getRoutes(routes, pathname)),
    ];
  }

  return [];
};

//* Custom Hooks
const WebsiteConfigContext = createContext<WebsiteConfig | undefined>(
  undefined
);

export const useWebsiteConfig: Types.WebsiteConfigHook = () => {
  const { query } = useRouter();
  const config = useContext(WebsiteConfigContext) as WebsiteConfig;

  return {
    config,
    homepage: getRoute(config.website.homeid, config.website.pages || []),
    routes: getRoutes(config.website.pages || [], [
      ...(Array.isArray(query.pathname) ? query.pathname : []),
    ]),
  };
};

//* Provider Component
export default function WebsiteConfigProvider({
  children,
  config,
}: Types.WebsiteConfigProviderProps) {
  return (
    <WebsiteConfigContext.Provider value={config}>
      {children}
    </WebsiteConfigContext.Provider>
  );
}
