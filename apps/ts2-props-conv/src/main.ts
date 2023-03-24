import { generate } from '@appcraft/server';
import * as endpoints from './endpoints';

generate(
  process.env.SVC_PORT_TS2_PROPS_CONV,
  __dirname,
  Object.values(endpoints)
);
