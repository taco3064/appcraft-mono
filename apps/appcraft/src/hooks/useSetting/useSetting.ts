import { DEFAULT_THEME, PALETTES } from '@appcraft/themes';
import { PaletteOptions, createTheme } from '@mui/material/styles';
import { getProps } from '@appcraft/mui';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import useSettingStore from './useSetting.hooks';
import { FindConfigContext, findConfig } from '~appcraft/services';
import type * as Types from './useSetting.types';

export const useFixedT: Types.FixedTHook = (...namespaces) => {
  const { getFixedT } = useSettingStore(
    ({ lng, getFixedT }) => ({
      lng,
      getFixedT,
    }),
    ({ lng: l1 }, { lng: l2 }) => l1 === l2
  );

  return namespaces.map((namespace) => getFixedT(namespace));
};

export const useAuthTokens: Types.UserAutTokensHook = () => {
  const tokens = {
    access:
      global.document?.cookie.match('(^|;)\\s*access\\s*=\\s*([^;]+)')?.pop() ||
      null,
    id:
      global.document?.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() ||
      null,
  };

  return {
    authorized: Object.values(tokens).every((token) => token),
    tokens,
  };
};

export const useSettingModified: Types.SettingModifiedHook = () =>
  useSettingStore(({ lng, setLng, theme, setTheme }) => ({
    lng,
    setLng,
    theme,
    setTheme,
  }));

export const useThemeStyle: Types.ThemeStyleHook = () => {
  const [id, timestamp] = useSettingStore(({ theme, timestamp }) => [
    theme,
    timestamp,
  ]);

  const { data: palette } = useQuery<PaletteOptions>({
    refetchOnWindowFocus: false,
    suspense: false,
    queryKey: [id, timestamp],
    queryFn: async (ctx: FindConfigContext) => {
      const isDefaultOption = ctx.queryKey[0] in PALETTES;

      if (!isDefaultOption) {
        try {
          const { content } = await findConfig(ctx);

          return getProps<PaletteOptions>(content);
        } catch (e) {
          console.warn(e);
        }
      }

      return PALETTES[ctx.queryKey[0]];
    },
  });

  return useMemo(
    () =>
      createTheme({
        ...DEFAULT_THEME,
        palette,
        components: {
          ...DEFAULT_THEME.components,
          MuiButton: {
            styleOverrides: {
              containedInherit: ({ theme }) => ({
                background: theme.palette.common.white,
                color: theme.palette.getContrastText(
                  theme.palette.common.white
                ),
              }),
            },
          },
        },
      }),
    [palette]
  );
};
