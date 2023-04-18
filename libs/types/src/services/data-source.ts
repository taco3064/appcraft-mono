import type { AxiosRequestConfig } from 'axios';

export type DataSource = Pick<
  AxiosRequestConfig,
  'url' | 'method' | 'headers' | 'data' | 'params'
>;
