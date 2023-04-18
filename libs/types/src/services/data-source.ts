import type { AxiosRequestConfig } from 'axios';

export interface DataSource
  extends Pick<
    AxiosRequestConfig,
    'url' | 'method' | 'headers' | 'data' | 'params'
  > {
  resExtract?: Record<string, string>;
}
