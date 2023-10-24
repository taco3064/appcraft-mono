import Typography from '@mui/material/Typography';
import { CraftedRenderer } from '@appcraft/exhibitor';

import { useCraftsmanFetch, useFixedT } from '~appcraft/hooks';
import type { PagePreviewProps } from './PagePreview.types';

export default function PagePreview({ breakpoint, options }: PagePreviewProps) {
  const [pt] = useFixedT('pages');
  const fetchHandles = useCraftsmanFetch();

  return !options ? (
    <Typography variant="h4" color="text.secondary">
      {pt('msg-no-layouts')}
    </Typography>
  ) : (
    <CraftedRenderer
      options={options.layouts}
      onFetchData={fetchHandles.data}
      onFetchWrapper={fetchHandles.wrapper}
      onReady={options.readyTodos}
      CollectionGridProps={{
        breakpoint,
        maxWidthes: options.maxWidthes,
        cols: __WEBPACK_DEFINE__.COLLECTION_COLS,
        rowHeight: __WEBPACK_DEFINE__.COLLECTION_ROW_HEIGHT,
      }}
    />
  );
}
