import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

import * as proptypesResolve from '~ts2-props-conv/services/proptypes-resolve';
import type * as ProptypesResolveTypes from '~ts2-props-conv/services/proptypes-resolve';

@Module({ base: 'proptypes' })
export default class Proptypes {
  @Endpoint({
    method: 'post',
    description: '解析指定的 Typescript Interface',
  })
  parse(req: Request, res: Response) {
    const body = req.body as ProptypesResolveTypes.ParseOptions;

    res.json(proptypesResolve.parse(body));
  }
}
