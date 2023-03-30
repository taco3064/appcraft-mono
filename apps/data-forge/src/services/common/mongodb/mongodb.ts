import { MongoClient, ServerApiVersion } from 'mongodb';
import type * as Types from './mongodb.types';

const clientSync = new MongoClient(__WEBPACK_DEFINE__.MONGODB_CONNECTION, {
  serverApi: ServerApiVersion.v1,
}).connect();

export const getClient: Types.GetClient = () => clientSync;

export const getCollection: Types.GetCollection = async <T>({
  db,
  collection,
}) => {
  const client = await getClient();

  console.log(__WEBPACK_DEFINE__.MONGODB_CONNECTION);

  return client.db(db).collection<T>(collection);
};
