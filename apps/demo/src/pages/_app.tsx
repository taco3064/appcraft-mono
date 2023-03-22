import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import NoSsr from '@mui/material/NoSsr';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import * as THEMES from '@appcraft/themes';
import { AppHeader } from '~demo/components';
import { MainContainer } from '~demo/styles';

export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Appcraft Demo</title>
      </Head>

      <NoSsr>
        <ThemeProvider theme={THEMES.DEFAULT_DARK}>
          <CssBaseline />

          <AppHeader
            oauth2={{ google: '/api/oauth2/google/login' }}
            onMenuToggle={() => setOpen(true)}
          />

          <MainContainer maxWidth="lg" className="app" component="main">
            <Component {...pageProps} />
          </MainContainer>
        </ThemeProvider>
      </NoSsr>
    </>
  );
}
