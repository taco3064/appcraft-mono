import Head from 'next/head';
import { useLocation, useNavigate } from 'react-router-dom';

import Breadcrumbs from '../Breadcrumbs';
import { PageContainer } from '~appcraft/styles';
import type { WebsiteRouteProps } from './WebsiteRoute.types';

export default function WebsiteRoute({
  basename,
  maxWidth,
  options,
  routes,
  title,
}: WebsiteRouteProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const paths = pathname.replace(/^\//, '').split('/');

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth={maxWidth}
      primary={options.subTitle}
    >
      <Head>
        <title>
          {title} | {options.subTitle}
        </title>
      </Head>

      <Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        onBack={() => navigate(-1)}
        onPush={navigate}
        onCustomize={() =>
          paths.map((path, i) => {
            const isLast = i === paths.length - 1;
            const target = routes.get(`/${path}`);

            return isLast
              ? { text: target.subTitle }
              : {
                  text: target.subTitle,
                  url: `${basename}/${paths.slice(0, i + 1).join('/')}`,
                };
          })
        }
      />
    </PageContainer>
  );
}
