import jwt from 'jsonwebtoken';
import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';
import type { Userinfo } from '@appcraft/server';

import * as hierarchy from '~data-forge/services/hierarchy';
import type { HierarchyData, SearchParams } from '~types/hierarchy';

@Module({ base: 'hierarchy' })
export default class Hierarchy {
  @Endpoint({
    url: 'search/:category',
    method: 'post',
    description: '查詢 Hierarchy Data',
  })
  async search(req: Request, res: Response) {
    const { id } = jwt.verify(
      req.cookies.jwt,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as Userinfo;

    res.json(
      await hierarchy.search(id, req.params.category, req.body as SearchParams)
    );
  }

  @Endpoint({
    method: 'post',
    description: '建立新的 Hierarchy Group / Item',
  })
  async add(req: Request, res: Response) {
    const { id } = jwt.verify(
      req.cookies.jwt,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as Userinfo;

    res.json(await hierarchy.add(id, req.body as HierarchyData));
  }
}
