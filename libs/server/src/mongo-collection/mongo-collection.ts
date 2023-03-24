import { MongoClient, ServerApiVersion } from 'mongodb';
import type * as Types from './mongo-collection.types';

const connect = new MongoClient(process.env.MONGODB_CONN, {
  serverApi: ServerApiVersion.v1,
}).connect();

export default async <T extends Record<string, any>>({
  db,
  collection,
}: Types.Options) => {
  const client = await connect;

  return client.db(db).collection<T>(collection);
};
