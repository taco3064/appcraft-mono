import { useLazyWidgetNav } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';

import { findConfig } from '~appcraft/services';
import type * as Types from './useLazyLayoutsNav.types';
import type { PageData } from '../usePageValues';

export function useLazyLayoutsNav<R>(
  ...[
    enabled,
    pageid,
    fetchWidgetWrapper,
    renderer,
  ]: Types.LazyLayoutsNavArgs<R>
): Types.LazyLayoutsNavReturnType<R> {
  const isEnabled = enabled && Boolean(pageid);

  const { data } = useQuery({
    enabled: isEnabled,
    queryKey: [pageid],
    queryFn: findConfig<PageData>,
    refetchOnWindowFocus: false,
  });

  const layouts = (isEnabled && data?.content?.layouts) || [];

  return [useLazyWidgetNav<R>(layouts, fetchWidgetWrapper, renderer), layouts];
}
