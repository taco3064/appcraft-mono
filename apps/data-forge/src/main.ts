import { generate } from '@appcraft/server';
import * as endpoints from './endpoints';

generate(process.env.SVC_PORT_DATA_FORGE, __dirname, Object.values(endpoints));
