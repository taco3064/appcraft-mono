import { ObjectId } from 'mongodb';

import { getCollection } from '../common';
import type * as Types from './config.types';

export const find: Types.FindService = async <C extends object = object>(
  id
) => {
  const collection = await getCollection<Types.ConfigData<C, ObjectId>>({
    db: 'data-forge',
    collection: 'config',
  });

  const data = await collection.findOne({
    _id: { $eq: new ObjectId(id) },
  });

  return data;
};

export const upsert: Types.UpsertService = async <C extends object = object>(
  id,
  content
) => {
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
  };
};

export const remove: Types.RemoveService = async (id) => {
  const collection = await getCollection<Types.ConfigData<object, ObjectId>>({
    db: 'data-forge',
    collection: 'config',
  });

  await collection.deleteOne({
    _id: { $eq: new ObjectId(id) },
  });
};
