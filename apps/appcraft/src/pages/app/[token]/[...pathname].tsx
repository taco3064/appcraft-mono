import Head from 'next/head';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';

import * as Hook from '~appcraft/hooks';
import { ExplorerLayout, Breadcrumbs } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { useWebsiteConfig } from '~appcraft/contexts';
import { withPerPageLayout } from '~appcraft/hocs';
import type { PageData } from '~appcraft/hooks';

const { GRID_LAYOUT } = Hook;

export default withPerPageLayout(ExplorerLayout, function WebsitePage() {
  const { config, routes } = useWebsiteConfig();
  const { token, title, website } = config;

  const page = routes[routes.length - 1];
  const fetchHandles = Hook.useCraftsmanFetch();
  const theme = useTheme();

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
                    .map(({ pathname }) => pathname)}`,
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
    </PageContainer>
  );
});
