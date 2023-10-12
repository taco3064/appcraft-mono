import Container from '@mui/material/Container';
import Head from 'next/head';
import _get from 'lodash/get';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';

import * as Hook from '~appcraft/hooks';
import { ExplorerLayout } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';
import { useWebsiteConfig } from '~appcraft/contexts';
import { withPerPageLayout } from '~appcraft/hocs';
import type { PageData } from '~appcraft/hooks';

const { GRID_LAYOUT } = Hook;

export default withPerPageLayout(ExplorerLayout, function WebsiteIndex() {
  const { config, homepage } = useWebsiteConfig();
  const { title, website } = config;

  const fetchHandles = Hook.useCraftsmanFetch();
  const theme = useTheme();

  const { data: home } = useQuery({
    enabled: Boolean(homepage?.pageid),
    queryKey: [homepage?.pageid],
    queryFn: findConfig<PageData>,
    refetchOnWindowFocus: false,
  });

  const handleRouterPush = Hook.useWebsiteRouter(
    config.token,
    home?.content,
    homepage,
    website.pages
  );

  return (
    <Container maxWidth={website.maxWidth}>
      <Head>
        <title>{title}</title>
      </Head>

      {home?.content && (
        <CraftedRenderer
          elevation={1}
          options={home.content.layouts}
          onFetchData={fetchHandles.data}
          onFetchWrapper={fetchHandles.wrapper}
          onOutputCollect={handleRouterPush}
          onReady={home.content.readyTodos}
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
