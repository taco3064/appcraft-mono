import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import type * as Types from './useWindowSize.types';

export const useWidth: Types.WidthHook = () => {
  const theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: Breakpoint | null, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || 'xs'
  );
};

export const useHeight: Types.HeightHook = () => {
  const [height, setHeight] = useState(`${global.window?.innerHeight || 0}px`);

  useEffect(() => {
    if (global.window) {
      const resizeHandle = () =>
        setHeight(`${global.window?.innerHeight || 0}px`);

      global.window.addEventListener('resize', resizeHandle);

      return () => global.window.removeEventListener('resize', resizeHandle);
    }
  }, []);

  return height;
};
