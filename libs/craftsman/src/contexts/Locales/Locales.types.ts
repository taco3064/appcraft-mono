import type { MutableRefObject, ReactNode } from 'react';

export type FixedT = (key: string, options?: object) => string;

export type Replaces = {
  pattern: RegExp;
  replacement: string | ((match: string, ...args: string[]) => string);
}[];

export type LocalesContextValue = MutableRefObject<FixedT>;

export interface LocalesProviderProps {
  children: ReactNode;
  fixedT: FixedT;
}
