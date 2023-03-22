import { generate } from '@appcraft/server';
import * as endpoints from './endpoints';

generate(process.env.OAUTH2_SERVICE_PORT, __dirname, Object.values(endpoints));
