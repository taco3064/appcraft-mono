import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';
import { ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

@Module({ base: 'data-group' })
export default class DataGroup {
  @Endpoint({
    method: 'post',
    description: '建立新的 Data Group',
  })
  async create(req: Request, res: Response) {
    const conn = await mongoose.connect(process.env.MONGODB_CONN, {
      serverApi: ServerApiVersion.v1,
    });

    console.log(conn);

    res.end();
  }
}
