import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

import * as config from '~data-forge/services/config';
import type * as ConfigTypes from '~data-forge/services/config';

@Module({ base: 'config' })
export default class Config {
  @Endpoint({
    url: '/find/:id',
    method: 'get',
    description: '查詢 Config Data',
  })
  async find(req: Request, res: Response) {
    res.json(await config.find(req.params.id));
  }

  @Endpoint({
    method: 'post',
    description: '建立新的 Config Data',
  })
  async upsert(req: Request, res: Response) {
    const { _id, content } = req.body as ConfigTypes.ConfigData<object, string>;

    res.json(await config.upsert(_id, content));
  }

  @Endpoint({
    url: '/remove/:id',
    method: 'delete',
    description: '刪除 Hierarchy Group / Item',
  })
  async remove(req: Request, res: Response) {
    await config.remove(req.params.id);
    res.end();
  }
}
