import NoSsr from '@mui/material/NoSsr';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import type { AppProps as NextAppProps } from 'next/app';

import IndexPage from './index';
import { useAuth } from '~appcraft/hooks';
import 'reactflow/dist/style.css';
import type { NextPageWithLayout } from '~appcraft/hocs';

//* App Component
export default function App({
  Component,
  pageProps,
}: NextAppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { pathname } = useRouter();
  const [{ authorized }] = useAuth();

  const client = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            enabled: authorized,
            suspense: true,
          },
        },
      }),
    [authorized]
  );

  return (
    <NoSsr>
      <QueryClientProvider client={client}>
        {getLayout(
          authorized || /^(\/app)/.test(pathname) ? (
            <Component {...pageProps} />
          ) : (
            <IndexPage />
          )
        )}
      </QueryClientProvider>
    </NoSsr>
  );
}
