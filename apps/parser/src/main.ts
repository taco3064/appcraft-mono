import { generate } from '@appcraft/server';
import * as endpoints from './endpoints';

generate(process.env.PARSER_SERVICE_PORT, __dirname, Object.values(endpoints));
