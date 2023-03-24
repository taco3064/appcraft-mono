import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

import * as DataGroupService from '~data-forge/services/DataGroup';

@Module({ base: 'data-group' })
export default class DataGroup {
  @Endpoint({
    method: 'post',
    description: '建立新的 Data Group',
  })
  async add(req: Request, res: Response) {
    res.json(
      await DataGroupService.add(req.body as DataGroupService.GroupData)
    );
  }
}
