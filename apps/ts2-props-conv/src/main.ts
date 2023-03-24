import { generate } from '@appcraft/server';
import * as endpoints from './endpoints';

generate({
  port: process.env.SVC_PORT_TS2_PROPS_CONV,
  endpoints: Object.values(endpoints),
  dirname: __dirname,
});
