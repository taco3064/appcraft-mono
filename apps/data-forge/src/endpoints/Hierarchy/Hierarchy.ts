import jwt from 'jsonwebtoken';
import { Module, Endpoint } from '@appcraft/server';
import { ObjectId } from 'mongodb';
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
    const { id } = jwt.verify(
      req.cookies.jwt,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as Userinfo;

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
    description: '查詢目標名稱',
  })
  async getNames(req: Request, res: Response) {
    const { id } = jwt.verify(
      req.cookies.jwt,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as Userinfo;

    res.json(
      await hierarchy.getNames(id, req.params.category, req.body as string[])
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

    res.json(await hierarchy.add(id, req.body as HierarchyTypes.HierarchyData));
  }

  @Endpoint({
    method: 'put',
    description: '編輯 Hierarchy Group / Item',
  })
  async update(req: Request, res: Response) {
    const { id } = jwt.verify(
      req.cookies.jwt,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as Userinfo;

    res.json(
      await hierarchy.update(id, req.body as HierarchyTypes.HierarchyData)
    );
  }

  @Endpoint({
    method: 'delete',
    description: '刪除 Hierarchy Group / Item',
  })
  async remove(req: Request, res: Response) {
    const { id } = jwt.verify(
      req.cookies.jwt,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as Userinfo;

    await hierarchy.remove(id, new ObjectId(req.query.id as string));
    res.end();
  }
}
