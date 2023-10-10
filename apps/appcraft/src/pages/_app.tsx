import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { AppProps as NextAppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

import IndexPage from './index';
import { useAuth } from '~appcraft/hooks';
import 'reactflow/dist/style.css';

//* Types
type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface AppProps extends NextAppProps {
  Component: NextPageWithLayout;
}

//* App Component
export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
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
    <QueryClientProvider client={client}>
      {getLayout(authorized ? <Component {...pageProps} /> : <IndexPage />)}
    </QueryClientProvider>
  );
}
