import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import AppHeader from '../AppHeader';
import PagePreview from '../PagePreview';
import WebsiteNavMenu from '../WebsiteNavMenu';
import { FullscreenContainer } from '~appcraft/styles';
import { useThemeStyle } from '~appcraft/hooks';
import type { WebsitePreviewProps } from './WebsitePreview.types';

export default function WebsitePreview({
  breakpoint,
  homepage,
  options,
  scale,
  title,
}: WebsitePreviewProps) {
  const [open, setOpen] = useState(false);
  const theme = useThemeStyle(options.theme);
  const breakpoints = theme.breakpoints.keys;
  const maxWidth = options.maxWidth || 'xl';

  return (
    <ThemeProvider theme={theme}>
      <FullscreenContainer
        disableGutters
        maxWidth={false}
        style={{ background: theme.palette.background.default }}
      >
        <Container
          disableGutters
          maxWidth={typeof scale === 'number' ? false : maxWidth}
          onClick={() => setOpen(false)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            ...(typeof scale === 'number' && {
              maxWidth: `${theme.breakpoints.values[maxWidth]}px`,
            }),
          }}
        >
          <AppHeader
            title={{ text: title, href: '/' }}
            onMenuToggle={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          />

          <FullscreenContainer
            disableGutters
            maxWidth={false}
            sx={{ position: 'relative', overflow: 'hidden auto' }}
          >
            <WebsiteNavMenu
              key={options.navAnchor}
              open={open}
              options={options}
              scale={scale}
            />

            <PagePreview
              key={options.homeid}
              options={homepage}
              breakpoint={
                breakpoints[
                  Math.min(
                    breakpoints.indexOf(maxWidth),
                    breakpoints.indexOf(breakpoint)
                  )
                ]
              }
            />
          </FullscreenContainer>
        </Container>
      </FullscreenContainer>
    </ThemeProvider>
  );
}
