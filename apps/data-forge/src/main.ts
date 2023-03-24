import { generate } from '@appcraft/server';
import * as endpoints from './endpoints';

generate({
  port: process.env.SVC_PORT_DATA_FORGE,
  endpoints: Object.values(endpoints),
  dirname: __dirname,
});
