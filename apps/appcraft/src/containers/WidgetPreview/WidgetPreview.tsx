import axios from 'axios';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';
import type { MainWidget, WidgetTodo } from '@appcraft/types';

import * as Service from '~appcraft/services';
import { useRendererFetchHandles } from '~appcraft/hooks';
import type * as Types from './WidgetPreview.types';

export default function WidgetPreview({ id }: Types.WidgetPreviewProps) {
  const handles = useRendererFetchHandles();

  const { data } = useQuery({
    queryKey: [id],
    queryFn: Service.findConfig<MainWidget>,
    refetchOnWindowFocus: false,
  });

  return (
    <CraftedRenderer
      options={data?.content}
      onFetchData={handles.data}
      onFetchWrapper={handles.wrapper}
    />
  );
}
