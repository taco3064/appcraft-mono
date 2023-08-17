import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import type { Breakpoint } from '@mui/system';

import type { WidthHook } from './useWidth.types';

export const useWidth: WidthHook = () => {
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
