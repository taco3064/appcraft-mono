import { CraftedRenderer } from '@appcraft/exhibitor';

import { useCraftsmanFetch } from '~appcraft/hooks';
import type * as Types from './WidgetPreview.types';

export default function WidgetPreview({ widget }: Types.WidgetPreviewProps) {
  const fetchHandles = useCraftsmanFetch();

  return (
    <CraftedRenderer
      options={widget}
      onFetchData={fetchHandles.data}
      onFetchWrapper={fetchHandles.wrapper}
    />
  );
}
