import Head from 'next/head';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';

import * as Hook from '~appcraft/hooks';
import { ExplorerLayout, Breadcrumbs } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { useWebsiteConfig } from '~appcraft/contexts';
import { withPerPageLayout } from '~appcraft/hocs';
import type { PageData } from '~appcraft/hooks';

export default withPerPageLayout(ExplorerLayout, function WebsitePage() {
  const { config, routes } = useWebsiteConfig();
  const { token, title, website } = config;

  const page = routes[routes.length - 1];
  const fetchHandles = Hook.useCraftsmanFetch();

  const { data } = useQuery({
    enabled: Boolean(page?.pageid),
    queryKey: [page?.pageid],
    queryFn: findConfig<PageData>,
    refetchOnWindowFocus: false,
  });

  const handleRouterPush = Hook.useWebsiteRouter(
    token,
    data?.content,
    page,
    website.pages
  );

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth={website.maxWidth}
      primary={page.subTitle}
    >
      <Head>
        <title>
          {title} | {page.subTitle}
        </title>
      </Head>

      <Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        onCustomize={() =>
          routes.map(({ subTitle }, i) => {
            const isLast = i === routes.length - 1;

            return isLast
              ? { text: subTitle }
              : {
                  text: subTitle,
                  url: `/app/${token}${routes
                    .slice(0, i + 1)
                    .map(({ pathname }) => pathname)
                    .join('')}`,
                };
          })
        }
      />

      {data?.content && (
        <CraftedRenderer
          elevation={1}
          options={data.content.layouts}
          onFetchData={fetchHandles.data}
          onFetchWrapper={fetchHandles.wrapper}
          onOutputCollect={handleRouterPush}
          onReady={data.content.readyTodos}
          CollectionGridProps={{
            maxWidthes: data.content.maxWidthes,
            cols: __WEBPACK_DEFINE__.COLLECTION_COLS,
            rowHeight: __WEBPACK_DEFINE__.COLLECTION_ROW_HEIGHT,
          }}
        />
      )}
    </PageContainer>
  );
});
