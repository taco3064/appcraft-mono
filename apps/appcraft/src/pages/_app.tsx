import Head from 'next/head';
import LinearProgress from '@mui/material/LinearProgress';
import NoSsr from '@mui/material/NoSsr';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import { Suspense, useState } from 'react';

import * as Comp from '~appcraft/components';
import IndexPage from './index';
import { MainContainer } from '~appcraft/styles';
import { useAuth } from '~appcraft/hooks';
import 'reactflow/dist/style.css';

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
  const [open, setOpen] = useState(false);

  const [{ authorized, isCallbackPending, tokens }, onSigninPrepare] =
    useAuth();

  return (
    <>
      <Head>
        <title>Appcraft</title>
      </Head>

      <NoSsr>
        <QueryClientProvider client={client}>
          <Comp.ThemeProvider>
            <SnackbarProvider anchorOrigin={origin}>
              <Comp.AppHeader
                authorized={authorized}
                onMenuToggle={() => setOpen(true)}
                action={
                  authorized ? (
                    <Comp.UserinfoMenuToggle
                      signoutURL={`/api/oauth2/signout?access=${encodeURIComponent(
                        tokens.access
                      )}`}
                      menuTransform="translate(12px, 10px)"
                    />
                  ) : (
                    <Comp.SigninButton
                      oauth2={{ google: '/api/oauth2/google' }}
                      onSigninClick={onSigninPrepare}
                    />
                  )
                }
              />

              {authorized && (
                <Comp.MenuDrawer open={open} onClose={() => setOpen(false)} />
              )}

              {!isCallbackPending && (
                <Suspense fallback={<LinearProgress />}>
                  <MainContainer
                    maxWidth={false}
                    className="app"
                    component="main"
                  >
                    {authorized ? <Component {...pageProps} /> : <IndexPage />}
                  </MainContainer>
                </Suspense>
              )}
            </SnackbarProvider>
          </Comp.ThemeProvider>
        </QueryClientProvider>
      </NoSsr>
    </>
  );
}
