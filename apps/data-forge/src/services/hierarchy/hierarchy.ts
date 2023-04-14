import { ObjectId } from 'mongodb';

import { getCollection } from '../common';
import type * as Types from './hierarchy.types';

export const search: Types.SearchService = async (
  userid,
  category,
  { keyword, superior }
) => {
  const collection = await getCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
  });

  const cursor = await collection.find({
    userid: { $eq: userid },
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

  return cursor.sort(['category', 'type', 'name']).toArray();
};

export const add: Types.AddService = async (userid, newData) => {
  const collection = await getCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
  });

  const result = await collection.insertOne({
    ...newData,
    userid,
    _id: new ObjectId(),
  });

  return {
    ...newData,
    _id: result.insertedId,
  };
};

export const update: Types.UpdateService = async (userid, { _id, ...data }) => {
  const collection = await getCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
  });

  const result = await collection.updateOne(
    {
      userid: { $eq: userid },
      _id: { $eq: new ObjectId(_id) },
    },
    {
      $set: data,
    }
  );

  return {
    ...data,
    _id: result.upsertedId,
  };
};

export const remove: Types.RemoveService = async (userid, dataid) => {
  const collection = await getCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
  });

  await collection.deleteOne({
    userid: { $eq: userid },
    _id: { $eq: dataid },
  });
};
