import { CraftedRenderer } from '@appcraft/mui';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { RootNodeWidget, WidgetTodo } from '@appcraft/types';

import * as Service from '~appcraft/services';
import { LazyMui } from '~appcraft/components';
import type { WidgetPreviewProps } from './WidgetPreview.types';

export default function WidgetPreview({ id }: WidgetPreviewProps) {
  const toLazy = useCallback((widgetType: string) => LazyMui[widgetType], []);

  const { data } = useQuery({
    queryKey: [id],
    queryFn: Service.findConfig<RootNodeWidget>,
    refetchOnWindowFocus: false,
  });

  return (
    <CraftedRenderer
      lazy={toLazy}
      options={data?.content}
      onFetchTodoWrapper={async (id) => {
        const { content } = await Service.getConfigById<
          Record<string, WidgetTodo>
        >(id);

        return content;
      }}
    />
  );
}
