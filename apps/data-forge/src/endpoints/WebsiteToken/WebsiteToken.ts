import jwt from 'jsonwebtoken';
import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';
import type { Userinfo } from '@appcraft/types';

import * as token from '~data-forge/services/website-token';

@Module({ base: 'website-token' })
export default class WebsiteToken {
  @Endpoint({
    url: 'find/:id',
    method: 'get',
    description: '查詢 Website App Token',
  })
  async find(req: Request, res: Response) {
    res.json(await token.find(req.params.id));
  }

  @Endpoint({
    url: 'create/:websiteid',
    method: 'post',
    description: '建立新的 Website App Token',
  })
  async create(req: Request, res: Response) {
    const { id } = jwt.verify(
      req.cookies.jwt,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as Userinfo;

    res.json(await token.create(id, req.params.websiteid));
  }

  @Endpoint({
    url: 'remove/:websiteid',
    method: 'delete',
    description: '刪除 Website App Token',
  })
  async remove(req: Request, res: Response) {
    const { id } = jwt.verify(
      req.cookies.jwt,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as Userinfo;

    await token.remove(id, req.params.websiteid);
    res.end();
  }
}
