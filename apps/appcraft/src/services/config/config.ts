import axios from 'axios';
import type { ConfigData } from '@appcraft/types';

import type * as Types from './config.types';

export async function getConfigById<C>(id: string) {
  const { data } =
    !id || typeof id !== 'string'
      ? { data: null }
      : await axios.get<ConfigData<C, string>>(
          `/api/data-forge/config/find/${id}`
        );

  return (data || {
    _id: id,
    content: {},
    timestamp: new Date().toISOString(),
  }) as ConfigData<C, string>;
}

export function findConfig<C>({ queryKey: [id] }: Types.FindConfigContext) {
  return getConfigById<C>(id);
}

export function upsertConfig<C>(
  data: Omit<ConfigData<C, string>, 'timestamp'>
) {
  return axios
    .post<ConfigData<C, string>>('/api/data-forge/config/upsert', data)
    .then(({ data: modified }) => modified);
}

export const removeConfig: Types.RemoveConfigService = async (id) =>
  axios.delete(`/api/data-forge/config/remove/${id}`);
