import { MongoClient, ServerApiVersion } from 'mongodb';
import { getSecretEnvironments } from '@appcraft/server';

import type * as Types from './mongodb.types';

const clientSync = getSecretEnvironments('MONGODB_CONNECTION').then(
  ({ MONGODB_CONNECTION }) =>
    new MongoClient(MONGODB_CONNECTION, {
      serverApi: ServerApiVersion.v1,
    }).connect()
);

export const getClient: Types.GetClient = () => clientSync;

export const getCollection: Types.GetCollection = async <T>({
  db,
  collection,
}) => {
  const client = await getClient();

  return client.db(db).collection<T>(collection);
};
