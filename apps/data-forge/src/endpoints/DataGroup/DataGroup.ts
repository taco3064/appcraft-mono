import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

@Module({ base: 'data-group' })
export default class DataGroup {
  @Endpoint({
    method: 'post',
    description: '建立新的 Data Group',
  })
  create(req: Request, res: Response) {
    res.end();
  }
}
