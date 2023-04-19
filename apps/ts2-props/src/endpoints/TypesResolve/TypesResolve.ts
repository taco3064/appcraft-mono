import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

import * as typesResolve from '~ts2-props/services/types-resolve';
import type { TypesParseOptions } from '@appcraft/types';

@Module({ base: 'types-resolve' })
export default class TypesResolve {
  @Endpoint({
    method: 'post',
    description: '解析指定的 Typescript Interface',
  })
  parse(req: Request, res: Response) {
    const body = req.body as TypesParseOptions;

    res.json(typesResolve.parse(body));
  }
}
