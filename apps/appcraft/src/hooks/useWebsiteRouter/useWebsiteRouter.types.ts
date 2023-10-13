import type { ExhibitorUtil } from '@appcraft/exhibitor';

import type { Navigation } from '../useNavValues';
import type { PageData } from '../usePageValues';

export type WebsiteRouterHook = (
  token: string,
  page: PageData,
  nav: Navigation,
  routes: Navigation[]
) => ExhibitorUtil.OutputCollectHandler;
