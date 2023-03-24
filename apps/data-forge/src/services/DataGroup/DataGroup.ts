import { ObjectId } from 'mongodb';

import { getMongoCollection } from '@appcraft/server';
import type * as Types from './DataGroup.types';

export const add: Types.Add = async (newData) => {
  const collection = await getMongoCollection<Types.GroupData<ObjectId>>({
    db: 'data-forge',
    collection: 'group',
  });

  const result = await collection.insertOne({
    ...newData,
    _id: new ObjectId(),
  });

  return {
    ...newData,
    _id: result.insertedId,
  };
};
