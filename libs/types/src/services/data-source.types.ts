import type { AxiosRequestConfig } from 'axios';

export interface DataSource
  extends Pick<
    AxiosRequestConfig,
    'url' | 'method' | 'headers' | 'data' | 'params'
  > {
  method?: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
  resExtract?: Record<string, string>;
}
