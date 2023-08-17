import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import type { Layout } from 'react-grid-layout';

import type * as Types from './useResponsiveProps.types';

const getLayout: Types.GetLayout = (sizes, size, { id, layout }) => {
  const allowed = sizes.slice(0, sizes.indexOf(size) + 1).reverse();

  return {
    i: id,
    ...(allowed.reduce<Omit<Layout, 'i'> | undefined>(
      (result, target) => result || layout[target],
      undefined
    ) || { x: 0, y: 0, w: 24, h: 1 }),
  };
};

export const useResponsiveProps: Types.ResponsivePropsHook = (options) => {
  const theme = useTheme();

  const stringify = useMemo(
    () =>
      JSON.stringify(
        !Array.isArray(options)
          ? null
          : options.map(({ id, layout }) => ({ id, layout }))
      ),
    [options]
  );

  return useMemo(() => {
    const keys = [...theme.breakpoints.keys];
    const opts: Parameters<Types.GetLayout>[2][] = JSON.parse(stringify);

    return !Array.isArray(opts)
      ? undefined
      : keys.reverse().reduce<Types.ResponsiveProps>(
          ({ breakpoints, cols, layouts }, size, i) => ({
            breakpoints: {
              ...breakpoints,
              [size]: Math.max(0, theme.breakpoints.values[size] - 1),
            },
            cols: {
              ...cols,
              [size]: (keys.length - i) * 2,
            },
            layouts: {
              ...layouts,
              [size]: opts.map((layout) =>
                getLayout(theme.breakpoints.keys, size, layout)
              ),
            },
          }),
          { breakpoints: {}, cols: {}, layouts: {} }
        );
  }, [theme, stringify]);
};
