import { ThemeProvider } from '@mui/material/styles';
import * as Mui from '@mui/material';

import { useThemeStyle } from '~appcraft/hooks';
import type { WebsitePreviewProps } from './WebsitePreview.types';

export default function WebsitePreview({ options }: WebsitePreviewProps) {
  const theme = useThemeStyle('64e61d41fb6bd49c621b90a9'); // (options.theme);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
          margin: 0,
          padding: 0,
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
      </div>
    </ThemeProvider>
  );
}
