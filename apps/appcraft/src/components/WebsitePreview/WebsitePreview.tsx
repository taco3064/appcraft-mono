import { ThemeProvider } from '@mui/material/styles';
import * as Mui from '@mui/material';

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
        style={{
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Mui.Typography variant="h5" color="primary">
          WebsitePreview
        </Mui.Typography>

        <Mui.Typography variant="h6" color="secondary">
          WebsitePreview
        </Mui.Typography>

        <Mui.Button color="primary" variant="contained">
          Button
        </Mui.Button>

        <Mui.Button color="secondary" variant="contained">
          Button
        </Mui.Button>
      </FullscreenContainer>
    </ThemeProvider>
  );
}
