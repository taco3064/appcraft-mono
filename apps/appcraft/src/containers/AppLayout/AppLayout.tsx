import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Head from 'next/head';
import NextLink from 'next/link';
import NoSsr from '@mui/material/NoSsr';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import * as Style from '~appcraft/styles';
import { AppHeader, WebsiteNavMenu } from '~appcraft/components';
import { ThemeProvider } from '~appcraft/contexts';
import { getWebsiteConfig } from '~appcraft/services';
import { useFixedT, useHeight } from '~appcraft/hooks';
import type { AppLayoutProps } from './AppLayout.types';

export default function AppLayout({ children }: AppLayoutProps) {
  const { query } = useRouter();
  const [wt] = useFixedT('websites');
  const [open, setOpen] = useState(false);

  const height = useHeight();

  const { data: config, error } = useQuery({
    queryKey: [query.token as string],
    queryFn: getWebsiteConfig,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Head>
        <title>Appcraft | {wt('ttl-preview')}</title>
      </Head>

      <NoSsr>
        <ThemeProvider themeid={config?.website.theme}>
          <Style.MuiSnackbarProvider>
            {error || !config ? (
              <Style.MaxWidthAlert
                maxWidth="sm"
                variant="outlined"
                severity="error"
                msgVariant="h6"
                icon={<ErrorOutlineIcon fontSize="large" />}
                sx={{ marginTop: 6 }}
                action={
                  query.websiteid && (
                    <Button
                      {...{ replace: true as never }}
                      fullWidth
                      variant="text"
                      size="large"
                      href={`/websites/detail?id=${query.websiteid}`}
                      LinkComponent={NextLink}
                    >
                      {wt('btn-to-setting')}
                    </Button>
                  )
                }
              >
                {wt('msg-invalid-preview')}
              </Style.MaxWidthAlert>
            ) : (
              <>
                <AppHeader
                  title={{ text: config.title, href: '/' }}
                  onMenuToggle={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                  }}
                />

                <WebsiteNavMenu
                  key={config.website.navAnchor}
                  open={open}
                  options={config.website}
                />

                <Style.MainContainer
                  maxWidth={false}
                  className="app"
                  component="main"
                  onClick={() => setOpen(false)}
                  sx={(theme) => ({
                    height: `calc(${height} - ${theme.spacing(
                      open && config.website.navAnchor === 'top' ? 16 : 9
                    )})`,
                  })}
                >
                  {children}
                </Style.MainContainer>
              </>
            )}
          </Style.MuiSnackbarProvider>
        </ThemeProvider>
      </NoSsr>
    </>
  );
}
