import { Request, Response } from 'express';

import * as ProptypesResolveService from '~parser/services/ProptypesResolve';
import { Module, Endpoint } from '~parser/decorators';

@Module({ base: 'proptypes' })
export default class Proptypes {
  @Endpoint({
    method: 'post',
    description: '解析指定的 Typescript Interface',
  })
  async parse(req: Request, res: Response) {
    const body = req.body as ProptypesResolveService.ParseOptions;

    res.json(ProptypesResolveService.parse(body));
  }
}
