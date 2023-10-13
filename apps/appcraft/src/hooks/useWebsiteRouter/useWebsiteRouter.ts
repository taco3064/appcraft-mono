import _get from 'lodash/get';
import { useRouter } from 'next/router';

import { getRoute } from '~appcraft/contexts';
import type { WebsiteRouterHook } from './useWebsiteRouter.types';

export const useWebsiteRouter: WebsiteRouterHook = (
  token,
  page,
  nav,
  routes
) => {
  const { push } = useRouter();

  return ({ group, outputs, widget, getWidgetOptions }, propPath) => {
    const { layouts } = page;
    const { links = [] } = nav;

    for (const link of links) {
      if (link.layout !== group || link.todoName !== propPath) {
        continue;
      }

      const target = getWidgetOptions(
        'template',
        _get(
          layouts.find(({ id }) => id === group),
          ['template', ...link.nodePaths, 'id']
        )
      );

      if (target?.id !== widget.id) {
        continue;
      }

      const { pathname } = getRoute(link.to, routes || []);

      push({
        pathname: `/app/${token}${pathname}`,
        query: link.searchParams?.reduce((result, { key, value }) => {
          const target = outputs.find(({ todo }) => todo === value);

          return !target?.output
            ? result
            : {
                ...result,
                [key]: JSON.stringify(target.output),
              };
        }, {}),
      });

      break;
    }
  };
};
