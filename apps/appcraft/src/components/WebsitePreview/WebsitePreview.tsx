import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import { FullscreenContainer } from '~appcraft/styles';
import { useThemeStyle } from '~appcraft/hooks';
import type { WebsitePreviewProps } from './WebsitePreview.types';

export default function WebsitePreview({ options }: WebsitePreviewProps) {
  const theme = useThemeStyle(options.theme);

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
        ></Container>
      </FullscreenContainer>
    </ThemeProvider>
  );
}
