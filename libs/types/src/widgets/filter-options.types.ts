import type { PropTypesDef } from './prop-types-def.types';

export interface FilterOptions<N extends string | RegExp = string> {
  types: PropTypesDef['type'][];
  names: N[];
}
