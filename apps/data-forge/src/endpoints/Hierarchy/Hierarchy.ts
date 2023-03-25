import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

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
    res.json(
      await hierarchy.search(
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
    res.json(await hierarchy.add(req.body as HierarchyTypes.HierarchyData));
  }
}
