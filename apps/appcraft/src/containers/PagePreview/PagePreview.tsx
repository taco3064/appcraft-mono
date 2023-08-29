import Typography from '@mui/material/Typography';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import type { LayoutWidget } from '@appcraft/types';

import { GRID_LAYOUT_COLS, GRID_LAYOUT_MINS } from '~appcraft/hooks';
import { findConfig } from '~appcraft/services';
import { useFixedT, useCraftsmanFetch } from '~appcraft/contexts';
import type { PagePreviewProps } from './PagePreview.types';

export default function PagePreview({ id }: PagePreviewProps) {
  const [pt] = useFixedT('pages');
  const theme = useTheme();
  const handleFetch = useCraftsmanFetch();

  const { data: layouts } = useQuery({
    queryKey: [id],
    queryFn: findConfig<LayoutWidget[]>,
    refetchOnWindowFocus: false,
  });

  return !Array.isArray(layouts.content) ? (
    <Typography variant="h4" color="text.secondary">
      {pt('msg-no-layouts')}
    </Typography>
  ) : (
    <CraftedRenderer
      elevation={1}
      options={layouts.content}
      onFetchData={handleFetch.data}
      onFetchWrapper={handleFetch.wrapper}
      GridLayoutProps={{
        autoSize: true,
        cols: GRID_LAYOUT_COLS,
        mins: GRID_LAYOUT_MINS,
        breakpoints: Object.fromEntries(
          Object.entries(theme.breakpoints.values).sort(
            ([, w1], [, w2]) => w2 - w1
          )
        ),
      }}
    />
  );
}
