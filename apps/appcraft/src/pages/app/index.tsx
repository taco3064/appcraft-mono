import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Head from 'next/head';
import LinearProgress from '@mui/material/LinearProgress';
import NextLink from 'next/link';
import NoSsr from '@mui/material/NoSsr';
import { RouterProvider } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { Website } from '@appcraft/types';

import * as Style from '~appcraft/styles';
import { AppHeader, WebsiteNavMenu } from '~appcraft/components';
import { ThemeProvider } from '~appcraft/contexts';
import { findConfig, getHierarchyNames } from '~appcraft/services';
import { useFixedT, useBrowserRouter, useHeight } from '~appcraft/hooks';

export default function WebsiteApp() {
  const { pathname, query } = useRouter();
  const [wt] = useFixedT('websites');
  const [open, setOpen] = useState(false);

  //* Fetch Data
  const { data: titles } = useQuery({
    enabled: Boolean(query.id),
    queryKey: ['websites', [query.id as string]],
    queryFn: getHierarchyNames,
    refetchOnWindowFocus: false,
  });

  const { data } = useQuery({
    enabled: Boolean(query.id),
    queryKey: [query.id as string],
    queryFn: findConfig<Website>,
    refetchOnWindowFocus: false,
  });

  const title = titles?.[query.id as string];
  const website = data?.content;
  const height = useHeight();

  //* Browser Router
  const routers = useBrowserRouter(
    pathname.replace(/\/\[\.\.\.pathname\]$/, ''),
    website,
    (route) => <div>{route?.subTitle}</div>
  );

  return (
    <>
      <Head>
        <title>Appcraft | {wt('ttl-preview')}</title>
      </Head>

      <NoSsr>
        <ThemeProvider themeid={website?.theme}>
          <Style.MuiSnackbarProvider>
            {!website ? (
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
            ) : (
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
                    position: 'relative',
                    overflow: 'hidden auto',
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
            )}
          </Style.MuiSnackbarProvider>
        </ThemeProvider>
      </NoSsr>
    </>
  );
}
