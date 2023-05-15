import type { PropTypesDef } from './prop-types-def.types';

export interface FilterOptions {
  types: PropTypesDef['type'][];
  names: string[];
}
