import type { UseQueryResult } from '@tanstack/react-query';

export type SuperiorsHook = (
  category: string
) => [UseQueryResult<Record<string, string>>, string[]];
