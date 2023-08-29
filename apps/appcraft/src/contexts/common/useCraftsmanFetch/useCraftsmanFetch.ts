import axios from 'axios';
import type { MainWidget, WidgetTodo } from '@appcraft/types';

import { getConfigById } from '~appcraft/services';
import type { CraftsmanFetchHook } from './useCraftsmanFetch.types';

export const useCraftsmanFetch: CraftsmanFetchHook = () => ({
  data: async ({ url, method, headers, data }) => {
    const { data: result } = await axios({
      url,
      method,
      headers,
      ...(data && { data }),
    });

    return result;
  },
  wrapper: async (category, id) => {
    const { content } = await getConfigById<
      typeof category extends 'widget' ? MainWidget : Record<string, WidgetTodo>
    >(id);

    return content;
  },
});
