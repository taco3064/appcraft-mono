import type { Collection, MongoClient } from 'mongodb';

export type GetClient = () => Promise<MongoClient>;

export type GetCollection = <T extends object>(options: {
  db: string;
  collection: string;
}) => Promise<Collection<T>>;
