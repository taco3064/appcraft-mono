import { ObjectId } from 'mongodb';

import { getMongoCollection } from '@appcraft/server';
import type * as Types from './hierarchy.types';

export const search: Types.SearchService = async (
  category,
  { keyword, superior }
) => {
  const collection = await getMongoCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
  });

  const cursor = await collection.find({
    category: { $eq: category },
    ...(superior && {
      superior: { $eq: superior },
    }),
    ...(keyword && {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    }),
  });

  return cursor
    .sort({
      category: 'asc',
      name: 'asc',
    })
    .toArray();
};

export const add: Types.AddService = async (newData) => {
  const collection = await getMongoCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
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
