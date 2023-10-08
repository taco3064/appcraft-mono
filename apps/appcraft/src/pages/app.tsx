import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Head from 'next/head';
import LinearProgress from '@mui/material/LinearProgress';
import NextLink from 'next/link';
import NoSsr from '@mui/material/NoSsr';
import { RouterProvider } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { Website } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import * as Style from '~appcraft/styles';
import { AppHeader, WebsiteNavMenu } from '~appcraft/components';
import { ThemeProvider } from '~appcraft/contexts';
import { WebsiteRoute } from '~appcraft/containers';
import { findConfig, getHierarchyNames } from '~appcraft/services';

export default function WebsiteApp() {
  const { pathname, query } = useRouter();
  const [wt] = Hook.useFixedT('websites');
  const [open, setOpen] = useState(false);

  //* Fetch Data
  const { data: titles } = useQuery({
    enabled: Boolean(query.id),
    queryKey: ['websites', [query.id as string]],
    queryFn: getHierarchyNames,
    refetchOnWindowFocus: false,
  });

  const { data, error } = useQuery({
    enabled: Boolean(query.id),
    queryKey: [query.id as string],
    queryFn: findConfig<Website>,
    refetchOnWindowFocus: false,
  });

  const basename = pathname.replace(/\/\[\.\.\.pathname\]$/, '');
  const title = titles?.[query.id as string];
  const website = data?.content;
  const height = Hook.useHeight();

  //* Browser Router
  const routers = Hook.useBrowserRouter(basename, website, (route) =>
    !route ? null : (
      <WebsiteRoute
        basename={basename}
        maxWidth={website?.maxWidth || 'xl'}
        options={route}
        routes={Hook.convertToPathMap(website?.pages || [])}
        title={title}
      />
    )
  );

  return (
    <>
      <Head>
        <title>Appcraft | {wt('ttl-preview')}</title>
      </Head>

      <NoSsr>
        <ThemeProvider themeid={website?.theme}>
          <Style.MuiSnackbarProvider>
            {website ? (
              <>
                <AppHeader
                  title={{ text: title, href: '/' }}
                  onMenuToggle={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                  }}
                />

                <WebsiteNavMenu
                  key={website.navAnchor}
                  open={open}
                  options={website}
                />

                <Style.MainContainer
                  maxWidth={false}
                  className="app"
                  component="main"
                  onClick={() => setOpen(false)}
                  sx={(theme) => ({
                    height: `calc(${height} - ${theme.spacing(
                      open && website.navAnchor === 'top' ? 16 : 9
                    )})`,
                  })}
                >
                  {routers && (
                    <RouterProvider
                      fallbackElement={<LinearProgress />}
                      router={routers}
                    />
                  )}
                </Style.MainContainer>
              </>
            ) : (
              error && (
                <Style.MaxWidthAlert
                  maxWidth="sm"
                  variant="outlined"
                  severity="error"
                  msgVariant="h6"
                  icon={<ErrorOutlineIcon fontSize="large" />}
                  sx={{ marginTop: 6 }}
                  action={
                    <Button
                      {...{ replace: true as never }}
                      fullWidth
                      variant="text"
                      size="large"
                      href={`/websites/detail?id=${query.id as string}`}
                      LinkComponent={NextLink}
                    >
                      {wt('btn-to-setting')}
                    </Button>
                  }
                >
                  {wt('msg-invalid-preview')}
                </Style.MaxWidthAlert>
              )
            )}
          </Style.MuiSnackbarProvider>
        </ThemeProvider>
      </NoSsr>
    </>
  );
}
