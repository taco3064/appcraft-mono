import Typography from '@mui/material/Typography';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import type { LayoutWidget } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { findConfig } from '~appcraft/services';
import type { PagePreviewProps } from './PagePreview.types';

export default function PagePreview({ id }: PagePreviewProps) {
  const [pt] = Hook.useFixedT('pages');
  const theme = useTheme();
  const rendererFetchHandles = Hook.useRendererFetchHandles();

  const { data: layouts } = useQuery({
    queryKey: [id],
    queryFn: findConfig<LayoutWidget[]>,
    refetchOnWindowFocus: false,
  });

  return !Array.isArray(layouts.content) ? (
    <Typography variant="h6" color="text.secondary">
      {pt('msg-no-layouts')}
    </Typography>
  ) : (
    <CraftedRenderer
      elevation={1}
      options={layouts.content}
      onFetchData={rendererFetchHandles.data}
      onFetchWrapper={rendererFetchHandles.wrapper}
      GridLayoutProps={{
        autoSize: true,
        cols: Hook.GRID_LAYOUT_COLS,
        mins: Hook.GRID_LAYOUT_MINS,
        breakpoints: Object.fromEntries(
          Object.entries(theme.breakpoints.values).sort(
            ([, w1], [, w2]) => w2 - w1
          )
        ),
      }}
    />
  );
}
