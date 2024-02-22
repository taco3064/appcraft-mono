import Container from '@mui/material/Container';
import NoSsr from '@mui/material/NoSsr';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import type { AppProps as NextAppProps } from 'next/app';

import IndexPage from './index';
import { useAuth, useHeight } from '~appcraft/hooks';
import type { NextPageWithLayout } from '~appcraft/hocs';
import 'reactflow/dist/style.css';
import '~appcraft/styles/app.scss';

//* App Component
export default function App({
  Component,
  pageProps,
}: NextAppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const height = useHeight();
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
        <Container disableGutters maxWidth={false} sx={{ height }}>
          {getLayout(
            authorized || /^(\/app)/.test(pathname) ? (
              <Component {...pageProps} />
            ) : (
              <IndexPage />
            )
          )}
        </Container>
      </QueryClientProvider>
    </NoSsr>
  );
}
