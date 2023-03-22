import { generate } from '@appcraft/server';
import * as endpoints from './endpoints';

generate(process.env.PROXY_SERVER_PORT, __dirname, Object.values(endpoints));
