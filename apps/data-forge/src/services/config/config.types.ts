import type { ObjectId } from 'mongodb';
import type * as Appcraft from '@appcraft/types';

export type ConfigData<C, U = undefined> = Appcraft.ConfigData<C, U>;

export type FindService = <C extends object = object>(
  id: string
) => Promise<ConfigData<C, ObjectId>>;

export type UpsertService = <C extends object = object>(
  id: string,
  content: C
) => Promise<ConfigData<C, ObjectId>>;

export type RemoveService = (id: string) => Promise<void>;
