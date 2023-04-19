import type { AxiosRequestConfig, Method } from 'axios';

export interface DataSource
  extends Pick<
    AxiosRequestConfig,
    'url' | 'method' | 'headers' | 'data' | 'params'
  > {
  method?: Method;
  resExtract?: Record<string, string>;
}
