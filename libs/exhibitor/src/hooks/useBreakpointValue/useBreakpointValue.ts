import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

import { getBreakpointValue } from '../../utils';
import { useWidth } from '../useWidth';
import type { BreakpointValueHookArgs } from './useBreakpointValue.types';
import type { GetBreakpointFnReturnType } from '../../utils';

export const useBreakpointValue = <T>(
  ...[settings, assignation]: BreakpointValueHookArgs<T>
): GetBreakpointFnReturnType<T> => {
  const theme = useTheme();
  const width = useWidth();

  const breakpoints = theme.breakpoints.keys;
  const target = assignation || width;

  return useMemo(
    () => getBreakpointValue<T>(breakpoints, settings, target),
    [breakpoints, settings, target]
  );
};
