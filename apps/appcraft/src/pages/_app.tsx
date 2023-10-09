import Head from 'next/head';
import LinearProgress from '@mui/material/LinearProgress';
import NoSsr from '@mui/material/NoSsr';
import { AppProps } from 'next/app';
import { CraftsmanLocalesProvider } from '@appcraft/craftsman';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useMemo, useState } from 'react';

import * as Comp from '~appcraft/components';
import IndexPage from './index';
import WebsiteApp from './app';
import { MainContainer, MuiSnackbarProvider } from '~appcraft/styles';
import { ThemeProvider } from '~appcraft/contexts';
import { useAuth, useFixedT } from '~appcraft/hooks';
import 'reactflow/dist/style.css';

export default function App({ Component, pageProps }: AppProps) {
  const [ct] = useFixedT('appcraft');
  const [open, setOpen] = useState(false);

  const [{ authorized, isCallbackPending, tokens }, onSigninPrepare] =
    useAuth();

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
      <Suspense fallback={<LinearProgress />}>
        {Component === WebsiteApp && authorized ? (
          <WebsiteApp />
        ) : (
          <>
            <Head>
              <title>Appcraft</title>
            </Head>

            <NoSsr>
              <ThemeProvider>
                <MuiSnackbarProvider>
                  <CraftsmanLocalesProvider fixedT={ct}>
                    {!authorized ? (
                      <Comp.AppHeader
                        title={{ text: 'Appcraft', href: '/' }}
                        action={
                          <Comp.SigninButton
                            oauth2={{ google: '/api/oauth2/google' }}
                            onSigninClick={onSigninPrepare}
                          />
                        }
                      />
                    ) : (
                      <Comp.AppHeader
                        title={{ text: 'Appcraft', href: '/' }}
                        onMenuToggle={() => setOpen(true)}
                        action={
                          <Comp.UserinfoMenuToggle
                            menuTransform="translate(12px, 10px)"
                            signoutURL={`/api/oauth2/signout?access=${encodeURIComponent(
                              tokens.access
                            )}`}
                          />
                        }
                      />
                    )}

                    {authorized && (
                      <Comp.MenuDrawer
                        open={open}
                        onClose={() => setOpen(false)}
                      />
                    )}

                    {!isCallbackPending && (
                      <Suspense fallback={<LinearProgress />}>
                        <MainContainer
                          maxWidth={false}
                          className="app"
                          component="main"
                        >
                          {authorized && Component !== WebsiteApp ? (
                            <Component {...pageProps} />
                          ) : (
                            <IndexPage />
                          )}
                        </MainContainer>
                      </Suspense>
                    )}
                  </CraftsmanLocalesProvider>
                </MuiSnackbarProvider>
              </ThemeProvider>
            </NoSsr>
          </>
        )}
      </Suspense>
    </QueryClientProvider>
  );
}
