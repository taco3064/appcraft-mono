import Head from 'next/head';
import LinearProgress from '@mui/material/LinearProgress';
import { CraftsmanLocalesProvider } from '@appcraft/craftsman';
import { Suspense, useState } from 'react';

import * as Comp from '~appcraft/components';
import { MainContainer, MuiSnackbarProvider } from '~appcraft/styles';
import { ThemeProvider } from '~appcraft/contexts';
import { useAuth, useFixedT } from '~appcraft/hooks';
import type { ArtisanLayoutProps } from './ArtisanLayout.types';

export default function ArtisanLayout({ children }: ArtisanLayoutProps) {
  const [ct] = useFixedT('appcraft');
  const [open, setOpen] = useState(false);

  const [{ authorized, isCallbackPending, tokens }, onSigninPrepare] =
    useAuth();

  return (
    <>
      <Head>
        <title>Appcraft</title>
      </Head>

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
              <Comp.ArtisanNavMenu open={open} onClose={() => setOpen(false)} />
            )}

            {!isCallbackPending && (
              <Suspense fallback={<LinearProgress />}>
                <MainContainer
                  maxWidth={false}
                  className="app"
                  component="main"
                >
                  {children}
                </MainContainer>
              </Suspense>
            )}
          </CraftsmanLocalesProvider>
        </MuiSnackbarProvider>
      </ThemeProvider>
    </>
  );
}
