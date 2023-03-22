import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import LinearProgress from '@mui/material/LinearProgress';
import NoSsr from '@mui/material/NoSsr';
import axios from 'axios';
import { AppProps } from 'next/app';
import { Suspense, lazy, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import * as THEMES from '@appcraft/themes';
import { AppHeader } from '~demo/components';
import { MainContainer } from '~demo/styles';

export default function App({ Component, pageProps }: AppProps) {
  const LazyPage = useMemo(
    () =>
      lazy(async () => {
        // if (code) {
        // await axios.get(
        //   `/api/parser/oauth/initial?code=${encodeURIComponent(code)}`
        // );
        // }

        return await import('./index');
      }),
    [Component]
  );

  return (
    <>
      <Head>
        <title>Appcraft Demo</title>
      </Head>

      <NoSsr>
        <ThemeProvider theme={THEMES.DEFAULT_DARK}>
          <CssBaseline />

          <AppHeader signinURL="/api/oauth2/google/login" />

          <Suspense fallback={<LinearProgress />}>
            <MainContainer maxWidth="lg" className="app" component="main">
              <LazyPage {...pageProps} />
            </MainContainer>
          </Suspense>
        </ThemeProvider>
      </NoSsr>
    </>
  );
}
