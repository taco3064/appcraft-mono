import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';
import type { MainWidget } from '@appcraft/types';

import * as Service from '~appcraft/services';
import { useCraftsmanFetch } from '~appcraft/hooks';
import type * as Types from './WidgetPreview.types';

export default function WidgetPreview({ id }: Types.WidgetPreviewProps) {
  const handleFetch = useCraftsmanFetch();

  const { data } = useQuery({
    queryKey: [id],
    queryFn: Service.findConfig<MainWidget>,
    refetchOnWindowFocus: false,
  });

  return (
    <CraftedRenderer
      options={data?.content}
      onFetchData={handleFetch.data}
      onFetchWrapper={handleFetch.wrapper}
    />
  );
}
