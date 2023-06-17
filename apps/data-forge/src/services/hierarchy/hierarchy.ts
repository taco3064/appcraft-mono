import { ObjectId } from 'mongodb';

import * as config from '../config';
import { getCollection } from '../common';
import type * as Types from './hierarchy.types';

export const search: Types.SearchService = async (
  userid,
  { category, keyword, superior }
) => {
  const collection = await getCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
  });

  const cursor = await collection.find({
    userid: { $eq: userid },
    ...(category && { category: { $eq: category } }),
    ...(!keyword
      ? { superior: superior ? { $eq: superior } : null }
      : {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
          ],
        }),
  });

  return cursor.sort(['category', 'type', 'name']).toArray();
};

export const getNames: Types.GetNamesService = async (
  userid,
  category,
  ids
) => {
  const collection = await getCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
  });

  const cursor = await collection.find({
    userid: { $eq: userid },
    category: { $eq: category },
    _id: { $in: ids.map((id) => new ObjectId(id)) },
  });

  return (await cursor.toArray()).reduce(
    (result, { _id, name }) => ({
      ...result,
      [_id.toString()]: name,
    }),
    {}
  );
};

export const add: Types.AddService = async (userid, newData) => {
  const collection = await getCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
  });

  const { insertedId } = await collection.insertOne({
    ...newData,
    userid,
    _id: new ObjectId(),
  });

  return { ...newData, _id: insertedId };
};

export const update: Types.UpdateService = async (userid, { _id, ...data }) => {
  const collection = await getCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
  });

  const { upsertedId } = await collection.updateOne(
    {
      userid: { $eq: userid },
      _id: { $eq: new ObjectId(_id) },
    },
    {
      $set: data,
    }
  );

  return { ...data, _id: upsertedId };
};

export const remove: Types.RemoveService = async (userid, dataid) => {
  const children = await search(userid, { superior: dataid });

  const collection = await getCollection<Types.HierarchyData<ObjectId>>({
    db: 'data-forge',
    collection: 'hierarchy',
  });

  await collection.deleteOne({
    userid: { $eq: userid },
    _id: { $eq: new ObjectId(dataid) },
  });

  await config.remove(dataid);

  return Promise.all(children.map(({ _id }) => remove(userid, _id.toString())));
};
