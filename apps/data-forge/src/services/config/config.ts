import { ObjectId } from 'mongodb';

import { getCollection } from '../common';
import type * as Types from './config.types';

export const find = async <C extends object>(id: string) => {
  const collection = await getCollection<Types.ConfigData<C, ObjectId>>({
    db: 'data-forge',
    collection: 'config',
  });

  return collection.findOne({
    _id: { $eq: new ObjectId(id) },
  });
};

export const upsert = async <C>({
  _id: id,
  content,
}: Types.ConfigData<C, string>) => {
  const timestamp = new Date().toISOString();

  const collection = await getCollection<Types.ConfigData<C, ObjectId>>({
    db: 'data-forge',
    collection: 'config',
  });

  const result = await collection.updateOne(
    { _id: { $eq: new ObjectId(id) } },
    { $set: { _id: new ObjectId(id), content, timestamp } },
    { upsert: true }
  );

  return {
    _id: result.upsertedId,
    content,
    timestamp,
  } as Types.ConfigData<C, ObjectId>;
};

export const remove = async <C>(id: string) => {
  const collection = await getCollection<Types.ConfigData<C, ObjectId>>({
    db: 'data-forge',
    collection: 'config',
  });

  return collection.deleteOne({
    _id: { $eq: new ObjectId(id) },
  });
};
