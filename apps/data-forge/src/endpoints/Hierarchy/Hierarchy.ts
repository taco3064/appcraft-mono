import jwt from 'jsonwebtoken';
import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';
import type { Userinfo } from '@appcraft/server';

import * as hierarchy from '~data-forge/services/hierarchy';
import type * as HierarchyTypes from '~data-forge/services/hierarchy';

@Module({ base: 'hierarchy' })
export default class Hierarchy {
  @Endpoint({
    url: 'search/:category',
    method: 'post',
    description: '查詢 Hierarchy Data',
  })
  async search(req: Request, res: Response) {
    const { jwt: token, secret } = req.cookies;
    const { id } = jwt.verify(token, secret) as Userinfo;

    res.json(
      await hierarchy.search(
        id,
        req.params.category,
        req.body as HierarchyTypes.SearchParams
      )
    );
  }

  @Endpoint({
    method: 'post',
    description: '建立新的 Hierarchy Group / Item',
  })
  async add(req: Request, res: Response) {
    const { jwt: token, secret } = req.cookies;
    const { id } = jwt.verify(token, secret) as Userinfo;

    res.json(await hierarchy.add(id, req.body as HierarchyTypes.HierarchyData));
  }
}
