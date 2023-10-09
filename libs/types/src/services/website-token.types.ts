import { ObjectId } from 'mongodb';

export interface WebsiteToken {
  _id: ObjectId;
  userid: string;
  websiteid: string;
}
