import axios from 'axios';
import type { ConfigData } from '@appcraft/types';

import type * as Types from './config.types';

export async function findConfig<C extends Types.ConfigValues>({
  queryKey: [id],
}: Types.FindConfigContext) {
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

export function upsertConfig<C extends Types.ConfigValues>(
  data: Omit<ConfigData<C, string>, 'timestamp'>
) {
  return axios
    .post<ConfigData<C, string>>('/api/data-forge/config/upsert', data)
    .then(({ data: modified }) => modified);
}

export const removeConfig: Types.RemoveConfigService = async (id) => {
  await axios.delete(`/api/data-forge/config/remove/${id}`);
};
