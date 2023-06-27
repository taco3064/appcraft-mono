import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

import * as typesResolve from '~ts2-props/services/types-resolve';
import type { TypesParseOptions } from '@appcraft/types';

@Module({ base: 'types-resolve' })
export default class TypesResolve {
  @Endpoint({
    method: 'post',
    description: '解析指定的 Configuration Typescript Interface',
  })
  parseConfigs(req: Request, res: Response) {
    const body = req.body as TypesParseOptions;

    res.json(typesResolve.parseConfigs(body));
  }

  @Endpoint({
    method: 'post',
    description: '解析指定的 Widget Props Typescript Interface',
  })
  parseWidget(req: Request, res: Response) {
    const body = req.body as TypesParseOptions;

    res.json(typesResolve.parseWidget(body));
  }

  @Endpoint({
    method: 'post',
    description: '取得指定的 Typescript Interface 中的 Element 與 Node',
  })
  getNodeProperties(req: Request, res: Response) {
    const body = req.body as TypesParseOptions[];

    res.json(typesResolve.getNodeProperties(body));
  }
}
