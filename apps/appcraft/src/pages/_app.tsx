import * as THEMES from '@appcraft/themes';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import LinearProgress from '@mui/material/LinearProgress';
import NoSsr from '@mui/material/NoSsr';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import { Suspense, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import IndexPage from './index';
import { AppHeader, MenuDrawer } from '~appcraft/containers';
import { MainContainer } from '~appcraft/styles';
import { useAuthTokens } from '~appcraft/hooks';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const origin: SnackbarOrigin = {
  horizontal: 'center',
  vertical: 'bottom',
};

export default function App({ Component, pageProps }: AppProps) {
  const { authorized, tokens } = useAuthTokens();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Appcraft</title>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        />
      </Head>

      <NoSsr>
        <QueryClientProvider client={client}>
          <ThemeProvider theme={THEMES.DEFAULT_DARK}>
            <CssBaseline />

            <SnackbarProvider anchorOrigin={origin}>
              <AppHeader
                authorized={authorized}
                oauth2={{ google: '/api/oauth2/google' }}
                signoutURL={`/api/oauth2/signout?access=${encodeURIComponent(
                  tokens.access
                )}`}
                onMenuToggle={() => setOpen(true)}
              />

              {authorized && (
                <MenuDrawer open={open} onClose={() => setOpen(false)} />
              )}

              <Suspense fallback={<LinearProgress />}>
                <MainContainer
                  maxWidth={false}
                  className="app"
                  component="main"
                >
                  {authorized ? <Component {...pageProps} /> : <IndexPage />}
                </MainContainer>
              </Suspense>
            </SnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </NoSsr>
    </>
  );
}
