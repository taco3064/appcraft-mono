import { Request, Response } from 'express';

type RequestMethod =
  | 'options'
  | 'get'
  | 'head'
  | 'put'
  | 'post'
  | 'delete'
  | 'patch';

export type Descriptor =
  | TypedPropertyDescriptor<(req: Request, res: Response) => Promise<void>>
  | TypedPropertyDescriptor<(req: Request, res: Response) => void>;

export interface DecoratorOptions {
  url?: string;
  method?: RequestMethod;
  description: string;
}
