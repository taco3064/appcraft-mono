import { MongoClient, ServerApiVersion } from 'mongodb';

import type * as Types from './mongo-collection.types';
import { getSecretEnvironments } from '../secret-environments';

const connectSync = getSecretEnvironments('MONGODB_CONNECTION').then(
  ({ MONGODB_CONNECTION }) =>
    new MongoClient(MONGODB_CONNECTION, {
      serverApi: ServerApiVersion.v1,
    }).connect()
);

export default async <T extends Record<string, any>>({
  db,
  collection,
}: Types.Options) => {
  const client = await connectSync;

  return client.db(db).collection<T>(collection);
};
