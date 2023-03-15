import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import NoSsr from '@mui/material/NoSsr';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';

import * as THEMES from '@core/themes';
import { MainContainer } from '~demo/styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Appcraft Demo</title>
      </Head>

      <NoSsr>
        <ThemeProvider theme={THEMES.DEFAULT_DARK}>
          <CssBaseline />

          <MainContainer maxWidth="lg" className="app" component="main">
            <Component {...pageProps} />
          </MainContainer>
        </ThemeProvider>
      </NoSsr>
    </>
  );
}
