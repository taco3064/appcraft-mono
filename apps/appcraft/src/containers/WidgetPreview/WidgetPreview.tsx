import axios from 'axios';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';
import type { MainWidget, WidgetTodo } from '@appcraft/types';

import * as Service from '~appcraft/services';
import type { WidgetPreviewProps } from './WidgetPreview.types';

export default function WidgetPreview({ id }: WidgetPreviewProps) {
  const { data } = useQuery({
    queryKey: [id],
    queryFn: Service.findConfig<MainWidget>,
    refetchOnWindowFocus: false,
  });

  return (
    <CraftedRenderer
      options={data?.content}
      onFetchWrapper={async (category, id) => {
        const { content } = await Service.getConfigById<
          typeof category extends 'widget'
            ? MainWidget
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
