import type { AxiosRequestConfig } from 'axios';

export interface DataSource
  extends Pick<AxiosRequestConfig, 'url' | 'method' | 'data' | 'params'> {
  headers?: Record<
    | 'Accept'
    | 'Content-Length'
    | 'User-Agent'
    | 'Content-Encoding'
    | 'Authorization',
    string
  >;

  method?: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
}
