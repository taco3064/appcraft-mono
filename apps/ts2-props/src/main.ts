import { generate } from '@appcraft/server';
import * as endpoints from './endpoints';

generate({
  port: process.env.PORT_TS2_PROPS,
  endpoints: Object.values(endpoints),
  dirname: __dirname,
});
