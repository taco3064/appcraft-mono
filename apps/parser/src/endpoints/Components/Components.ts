import { Request, Response } from 'express';

import * as TSResolveService from '~parser/services/TSResolve';
import { Module, Endpoint } from '~parser/decorators';

@Module({ base: 'components' })
export default class Components {
  @Endpoint({
    method: 'post',
    description: '解析指定的 Typescript Types',
  })
  async parse(req: Request, res: Response) {
    const body = req.body as TSResolveService.ResolveOptions;

    res.json(TSResolveService.resolvePropTypes(body));
  }
}
