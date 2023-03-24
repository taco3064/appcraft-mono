import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

import * as ProptypesResolveService from '~parser/services/ProptypesResolve';

@Module({ base: 'proptypes' })
export default class Proptypes {
  @Endpoint({
    method: 'post',
    description: '解析指定的 Typescript Interface',
  })
  parse(req: Request, res: Response) {
    const body = req.body as ProptypesResolveService.ParseOptions;

    res.json(ProptypesResolveService.parse(body));
  }
}
