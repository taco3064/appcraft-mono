import type { ObjectId } from 'mongodb';

export interface GroupData<U = undefined> {
  _id: U;
  description?: string;
  name: string;
  superior?: string;
  type: string;
}

export type Add = (data: GroupData) => Promise<GroupData<ObjectId>>;
