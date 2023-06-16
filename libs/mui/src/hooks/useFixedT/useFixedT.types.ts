import type { FixedT } from '../../contexts';

export { FixedT };

export type Replaces = {
  pattern: RegExp;
  replacement: string | ((match: string, ...args: string[]) => string);
}[];

export type FixedTHook = (defaultFixedT?: FixedT) => FixedT;
