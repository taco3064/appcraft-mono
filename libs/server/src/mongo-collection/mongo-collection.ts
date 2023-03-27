import { MongoClient, ServerApiVersion } from 'mongodb';

import type * as Types from './mongo-collection.types';
import { secretEnv } from '../secret-env';

const connectSync = secretEnv.then(({ MONGODB_CONNECTION }) =>
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
