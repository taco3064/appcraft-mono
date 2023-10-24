import type { Website, WebsiteToken } from '@appcraft/types';

import * as config from '../config';
import * as hierarchy from '../hierarchy';
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

export const getConfigByToken: Types.GetConfigByTokenService = async (
  token
) => {
  const collection = await getCollection<WebsiteToken>({
    db: 'data-forge',
    collection: 'website-token',
  });

  const { userid, websiteid } = await collection.findOne({
    _id: { $eq: token },
  });

  const [{ name: title }] = await hierarchy.search(userid, {
    category: 'websites',
    targets: [websiteid],
  });

  const { content: website } = await config.find<Website>(websiteid);

  return {
    token,
    userid,
    title,
    website,
  };
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

  const [latest] = await collection
    .aggregate([
      { $match: { userid: { $eq: userid } } },
      {
        $group: {
          _id: '$userid',
          token: { $max: '$_id' },
        },
      },
    ])
    .limit(1)
    .toArray();

  const { insertedId } = await collection.insertOne({
    userid,
    websiteid,
    _id: `${email.replace(/@.*/, '')}-${
      (Number.parseInt(
        latest?.token.replace(`${email.replace(/@.*/, '')}-`, ''),
        10
      ) || 0) + 1
    }`,
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
