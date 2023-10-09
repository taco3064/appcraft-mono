import { ObjectId } from 'mongodb';
import { nanoid } from 'nanoid';
import type { WebsiteToken } from '@appcraft/types';

import { getCollection } from '../common';
import type * as Types from './website-token.types';

export const find: Types.FindService = async (token) => {
  const collection = await getCollection<WebsiteToken>({
    db: 'data-forge',
    collection: 'website-token',
  });

  return collection.findOne({
    _id: { $eq: new ObjectId(token) },
  });
};

export const create: Types.CreateService = async (userid, websiteid) => {
  const collection = await getCollection<WebsiteToken>({
    db: 'data-forge',
    collection: 'website-token',
  });

  const exists = await collection.findOne({
    userid: { $eq: userid },
    websiteid: { $eq: websiteid },
  });

  if (exists) {
    return exists._id;
  }

  const { insertedId } = await collection.insertOne({
    _id: new ObjectId(nanoid(6)),
    userid,
    websiteid,
  });

  return insertedId;
};

export const remove: Types.RemoveService = async (userid, websiteid) => {
  const collection = await getCollection<WebsiteToken>({
    db: 'data-forge',
    collection: 'website-token',
  });

  await collection.deleteOne({
    userid: { $eq: userid },
    websiteid: { $eq: websiteid },
  });
};
