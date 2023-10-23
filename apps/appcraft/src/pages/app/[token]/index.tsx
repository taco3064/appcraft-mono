import Container from '@mui/material/Container';
import Head from 'next/head';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';

import * as Hook from '~appcraft/hooks';
import { ExplorerLayout } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { useWebsiteConfig } from '~appcraft/contexts';
import { withPerPageLayout } from '~appcraft/hocs';
import type { PageData } from '~appcraft/hooks';

export default withPerPageLayout(ExplorerLayout, function WebsiteIndex() {
  const fetchHandles = Hook.useCraftsmanFetch();

  const { config, homepage } = useWebsiteConfig();
  const { title, website } = config;

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
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth={website.maxWidth}
      primary={homepage.subTitle}
    >
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
          CollectionGridProps={{
            maxWidthes: home.content.maxWidthes,
            cols: __WEBPACK_DEFINE__.COLLECTION_COLS,
            containerSx: { height: '100%', overflow: 'hidden auto' },
            rowHeight: __WEBPACK_DEFINE__.COLLECTION_ROW_HEIGHT,
          }}
        />
      )}
    </PageContainer>
  );
});
