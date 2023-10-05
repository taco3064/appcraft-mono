import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import AppHeader from '../AppHeader';
import WebsiteNavMenu from '../WebsiteNavMenu';
import { FullscreenContainer } from '~appcraft/styles';
import { useThemeStyle } from '~appcraft/hooks';
import type { WebsitePreviewProps } from './WebsitePreview.types';

export default function WebsitePreview({
  options,
  scale,
  title,
}: WebsitePreviewProps) {
  const theme = useThemeStyle(options.theme);
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <FullscreenContainer
        disableGutters
        maxWidth={false}
        style={{ background: theme.palette.background.default }}
      >
        <Container
          disableGutters
          maxWidth={options.maxWidth || 'xl'}
          onClick={() => setOpen(false)}
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <AppHeader
            title={{ text: title, href: '/' }}
            onMenuToggle={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          />

          <FullscreenContainer maxWidth={false} sx={{ position: 'relative' }}>
            <WebsiteNavMenu open={open} options={options} scale={scale} />
          </FullscreenContainer>
        </Container>
      </FullscreenContainer>
    </ThemeProvider>
  );
}
