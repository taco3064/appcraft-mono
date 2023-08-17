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

  return useMemo(
    () =>
      !Array.isArray(options)
        ? undefined
        : theme.breakpoints.keys.reduce<Types.ResponsiveProps>(
            ({ breakpoints, cols, layouts }, size, i, sizes) => {
              return {
                breakpoints: {
                  ...breakpoints,
                  [size]: theme.breakpoints.values[size],
                },
                cols: {
                  ...cols,
                  [size]: (i + 1) * 2,
                },
                layouts: {
                  ...layouts,
                  [size]: options.map((layout) =>
                    getLayout(sizes, size, layout)
                  ),
                },
              };
            },
            { breakpoints: {}, cols: {}, layouts: {} }
          ),
    [theme, options]
  );
};
