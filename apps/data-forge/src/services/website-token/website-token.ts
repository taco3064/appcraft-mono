import type { WebsiteToken } from '@appcraft/types';

import { getCollection } from '../common';
import type * as Types from './website-token.types';

export const find: Types.FindService = async (userid, websiteid) => {
  const collection = await getCollection<WebsiteToken>({
    db: 'data-forge',
    collection: 'website-token',
  });

  return collection.findOne({
    userid: { $eq: userid },
    websiteid: { $eq: websiteid },
  });
};

export const findByToken: Types.FindByTokenService = async (token) => {
  const collection = await getCollection<WebsiteToken>({
    db: 'data-forge',
    collection: 'website-token',
  });

  return collection.findOne({
    _id: { $eq: token },
  });
};

export const create: Types.CreateService = async (
  { id: userid, email },
  websiteid
) => {
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

  const count = await collection.countDocuments({
    userid: { $eq: userid },
  });

  const { insertedId } = await collection.insertOne({
    _id: `${email.replace(/@.*/, '')}-${count + 1}`,
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
