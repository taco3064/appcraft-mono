import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint } from '@mui/system';
import { useTheme } from '@mui/material/styles';

import type * as Types from './useWidth.types';

const useWidth: Types.WidthHook = () => {
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

export default useWidth;
