import axios from 'axios';
import { CraftedRenderer } from '@appcraft/mui';
import { useQuery } from '@tanstack/react-query';
import type { RootNodeWidget, WidgetTodo } from '@appcraft/types';

import * as Service from '~appcraft/services';
import { LazyMui } from '~appcraft/components';
import type { WidgetPreviewProps } from './WidgetPreview.types';

export default function WidgetPreview({ id }: WidgetPreviewProps) {
  const { data } = useQuery({
    queryKey: [id],
    queryFn: Service.findConfig<RootNodeWidget>,
    refetchOnWindowFocus: false,
  });

  return (
    <CraftedRenderer
      options={data?.content}
      onLazyRetrieve={(type: string) => LazyMui[type]}
      onFetchWrapper={async (category, id) => {
        const { content } = await Service.getConfigById<
          typeof category extends 'widget'
            ? RootNodeWidget
            : Record<string, WidgetTodo>
        >(id);

        return content;
      }}
      onFetchData={async ({ url, method, headers, data }) => {
        const { data: result } = await axios({
          url,
          method,
          headers,
          ...(data && { data }),
        });

        return result;
      }}
    />
  );
}
