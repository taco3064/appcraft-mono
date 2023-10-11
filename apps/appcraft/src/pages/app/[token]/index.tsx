import Container from '@mui/material/Container';
import Head from 'next/head';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';

import { AppLayout } from '~appcraft/containers';
import { GRID_LAYOUT, useCraftsmanFetch } from '~appcraft/hooks';
import { findConfig } from '~appcraft/services';
import { useWebsiteConfig } from '~appcraft/contexts';
import { withPerPageLayout } from '~appcraft/hocs';
import type { PageData } from '~appcraft/hooks';

export default withPerPageLayout(AppLayout, function WebsiteIndex() {
  const fetchHandles = useCraftsmanFetch();
  const theme = useTheme();

  const { config, homepage } = useWebsiteConfig();
  const { title, website } = config;

  const { data } = useQuery({
    enabled: Boolean(homepage?.pageid),
    queryKey: [homepage?.pageid],
    queryFn: findConfig<PageData>,
    refetchOnWindowFocus: false,
  });

  return (
    <Container maxWidth={website.maxWidth}>
      <Head>
        <title>{title}</title>
      </Head>

      {data?.content && (
        <CraftedRenderer
          elevation={1}
          options={data.content.layouts}
          onFetchData={fetchHandles.data}
          onFetchWrapper={fetchHandles.wrapper}
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
      )}
    </Container>
  );
});
