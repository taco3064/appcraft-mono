import { DEFAULT_THEME, PALETTES } from '@appcraft/themes';
import { PaletteOptions, createTheme } from '@mui/material/styles';
import { getProps } from '@appcraft/mui';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import useAppStore from './useApp.zustand';
import { FindConfigContext, findConfig } from '~appcraft/services';
import type * as Types from './useApp.types';

export const useFixedT: Types.FixedTHook = (...namespaces) => {
  const { getFixedT } = useAppStore(
    ({ lng, getFixedT }) => ({
      lng,
      getFixedT,
    }),
    ({ lng: l1 }, { lng: l2 }) => l1 === l2
  );

  return namespaces.map((namespace) => getFixedT(namespace));
};

export const useAuth: Types.AuthHook = () => {
  const tokens = {
    access:
      global.document?.cookie.match('(^|;)\\s*access\\s*=\\s*([^;]+)')?.pop() ||
      null,
    id:
      global.document?.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() ||
      null,
  };

  const isBrowser = global.sessionStorage && global.location;
  const authorized = Object.values(tokens).every((token) => token);

  useEffect(() => {
    if (authorized && isBrowser && global.sessionStorage.getItem('redirect')) {
      const redirect = global.sessionStorage.getItem('redirect');

      global.sessionStorage.removeItem('redirect');
      global.location.replace(redirect || '/');
    }
  }, [authorized, isBrowser]);

  return [
    {
      authorized,
      tokens,

      isCallbackPending: Boolean(
        isBrowser && global.sessionStorage.getItem('redirect')
      ),
    },
    () => {
      if (isBrowser) {
        global.sessionStorage.setItem('redirect', global.location.href);
      }
    },
  ];
};

export const useSettingModified: Types.SettingModifiedHook = () =>
  useAppStore(({ lng, setLng, theme, setTheme }) => ({
    lng,
    setLng,
    theme,
    setTheme,
  }));

export const useThemeStyle: Types.ThemeStyleHook = () => {
  const [id, timestamp] = useAppStore(({ theme, timestamp }) => [
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
      }),
    [palette]
  );
};
