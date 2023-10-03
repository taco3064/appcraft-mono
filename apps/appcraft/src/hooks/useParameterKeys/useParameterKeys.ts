import { useQuery } from '@tanstack/react-query';

import { findConfig } from '~appcraft/services';
import type { PageData } from '../usePageValues';
import type { ParameterKeysHook } from './useParameterKeys.types';

export const useParameterKeys: ParameterKeysHook = (pages, active) => {
  const target = pages.find(({ value }) => value.nav === active?.link?.to);
  const enabled = Boolean(target?.value?.page);

  const { data } = useQuery({
    enabled,
    queryKey: [target?.value?.page],
    queryFn: findConfig<PageData>,
    refetchOnWindowFocus: false,
  });

  const todos = (enabled && data?.content?.readyTodos) || {};

  return Object.values(todos).reduce((result, todo) => {
    if (todo.category === 'search') {
      const { paramKeys = [] } = todo;

      result.push(
        ...paramKeys.map((name) => ({
          value: name,
          primary: name,
        }))
      );
    }

    return result;
  }, []);
};
