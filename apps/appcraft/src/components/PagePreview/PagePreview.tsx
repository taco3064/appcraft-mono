import Typography from '@mui/material/Typography';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useTheme } from '@mui/material/styles';

import { GRID_LAYOUT, useCraftsmanFetch, useFixedT } from '~appcraft/hooks';
import type { PagePreviewProps } from './PagePreview.types';

export default function PagePreview({ breakpoint, options }: PagePreviewProps) {
  const [pt] = useFixedT('pages');
  const theme = useTheme();
  const fetchHandles = useCraftsmanFetch();

  return !options ? (
    <Typography variant="h4" color="text.secondary">
      {pt('msg-no-layouts')}
    </Typography>
  ) : (
    <CraftedRenderer
      breakpoint={breakpoint}
      elevation={1}
      options={options.layouts}
      onFetchData={fetchHandles.data}
      onFetchWrapper={fetchHandles.wrapper}
      onReady={options.readyTodos}
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
