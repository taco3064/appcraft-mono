import Typography from '@mui/material/Typography';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';

import { GRID_LAYOUT, useCraftsmanFetch, useFixedT } from '~appcraft/hooks';
import { findConfig } from '~appcraft/services';
import type { PageData } from '~appcraft/hooks';
import type { PagePreviewProps } from './PagePreview.types';

export default function PagePreview({ id }: PagePreviewProps) {
  const [pt] = useFixedT('pages');
  const theme = useTheme();
  const handleFetch = useCraftsmanFetch();

  const { data } = useQuery({
    queryKey: [id],
    queryFn: findConfig<PageData>,
    refetchOnWindowFocus: false,
  });

  return !data?.content ? (
    <Typography variant="h4" color="text.secondary">
      {pt('msg-no-layouts')}
    </Typography>
  ) : (
    <CraftedRenderer
      elevation={1}
      options={data.content.layouts}
      onFetchData={handleFetch.data}
      onFetchWrapper={handleFetch.wrapper}
      onReady={data.content.readyTodos}
      GridLayoutProps={{
        autoSize: true,
        cols: GRID_LAYOUT.COLS,
        mins: GRID_LAYOUT.MINS,
        breakpoints: Object.fromEntries(
          Object.entries(theme.breakpoints.values).sort(
            ([, w1], [, w2]) => w2 - w1
          )
        ),
      }}
    />
  );
}
