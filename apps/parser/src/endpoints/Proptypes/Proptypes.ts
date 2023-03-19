import { Request, Response } from 'express';
import { Module, Endpoint } from '~parser/decorators';

@Module({ base: 'proptypes' })
export default class Proptypes {
  @Endpoint({
    method: 'post',
    description: '解析指定的 Typescript Interface',
  })
  async parse(req: Request, res: Response) {}
}
