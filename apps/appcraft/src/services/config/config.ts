import axios from 'axios';
import type * as Types from './config.types';

export async function findConfig<C extends object>({
  queryKey: [id],
}: Types.FindConfigContext) {
  const { data } =
    !id || typeof id !== 'string'
      ? { data: null }
      : await axios.get<Types.ConfigData<C, string>>(
          `/api/data-forge/config/find/${id}`
        );

  return (data || {
    _id: id,
    content: {},
    timestamp: new Date().toISOString(),
  }) as Types.ConfigData<C, string>;
}

export function upsertConfig<C extends object>(
  data: Omit<Types.ConfigData<C, string>, 'timestamp'>
) {
  return axios
    .post<Types.ConfigData<C, string>>('/api/data-forge/config/upsert', data)
    .then(({ data: modified }) => modified);
}

export const removeConfig: Types.RemoveConfigService = async (id) => {
  await axios.delete(`/api/data-forge/config/remove/${id}`);
};
