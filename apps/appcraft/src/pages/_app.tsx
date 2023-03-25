import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import NoSsr from '@mui/material/NoSsr';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import * as THEMES from '@appcraft/themes';
import IndexPage from './index';
import { AppHeader, MenuDrawer } from '~appcraft/components';
import { MainContainer } from '~appcraft/styles';
import { useUserAccount } from '~appcraft/hooks';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { authorized } = useUserAccount();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Appcraft Demo</title>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        />
      </Head>

      <NoSsr>
        <QueryClientProvider client={client}>
          <ThemeProvider theme={THEMES.DEFAULT_DARK}>
            <CssBaseline />

            <AppHeader
              authorized={authorized}
              oauth2={{ google: '/api/oauth2/google' }}
              onMenuToggle={() => setOpen(true)}
            />

            {authorized && (
              <MenuDrawer open={open} onClose={() => setOpen(false)} />
            )}

            <MainContainer maxWidth={false} className="app" component="main">
              {authorized ? <Component {...pageProps} /> : <IndexPage />}
            </MainContainer>
          </ThemeProvider>
        </QueryClientProvider>
      </NoSsr>
    </>
  );
}
