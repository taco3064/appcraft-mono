import type { DefaultImplement } from '../decorators';

export interface Options {
  port: string;
  endpoints: DefaultImplement[];
  dirname?: string;
  ignoreAuth?: RegExp[];
}
