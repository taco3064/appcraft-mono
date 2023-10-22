import type { GetBreakpointFnArgs } from '../../utils';

export type BreakpointValueHookArgs<T> = [
  GetBreakpointFnArgs<T>[1],
  GetBreakpointFnArgs<T>[2]
];
