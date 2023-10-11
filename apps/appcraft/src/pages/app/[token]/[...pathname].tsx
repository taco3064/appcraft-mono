import Head from 'next/head';

import { AppLayout, Breadcrumbs } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useWebsiteConfig } from '~appcraft/contexts';
import { withPerPageLayout } from '~appcraft/hocs';

export default withPerPageLayout(AppLayout, function WebsitePage() {
  const { config, routes } = useWebsiteConfig();
  const { token, title, website } = config;
  const page = routes[routes.length - 1];

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
    </PageContainer>
  );
});
