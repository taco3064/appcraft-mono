import type { ActiveLink } from '../useLinkHandles';
import type { BaseOption } from '../usePathOptions';
import type { NavOption } from '../useNavOptions';

export type ParameterKeysHook = (
  pages: NavOption[],
  active?: ActiveLink
) => BaseOption[];
