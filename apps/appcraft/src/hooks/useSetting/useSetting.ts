import * as THEMES from '@appcraft/themes';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ThemeOptions, createTheme } from '@mui/material/styles';

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
  const tokens = useSettingStore(
    ({ tokens }) => tokens,
    (t1, t2) => t1 === t2
  );

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

  const { data: theme } = useQuery({
    refetchOnWindowFocus: false,
    suspense: false,
    queryKey: [id, timestamp],
    queryFn: async (ctx: FindConfigContext) => {
      const isDefaultOption = ctx.queryKey[0] in THEMES;

      if (!isDefaultOption) {
        try {
          const { content } = await findConfig<ThemeOptions>(ctx);

          return content;
        } catch (e) {
          console.warn(e);
        }
      }

      return THEMES[ctx.queryKey[0]];
    },
  });

  return useMemo(() => createTheme(theme), [theme]);
};
