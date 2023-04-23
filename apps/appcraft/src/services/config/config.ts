import axios from 'axios';
import type * as Types from './config.types';

export function findConfig<C extends object>({
  queryKey: [id],
}: Types.FindConfigContext) {
  return axios
    .get<Types.ConfigData<C, string>>(`/api/data-forge/config/find/${id}`)
    .then(({ data }) => data)
    .catch(() => ({ _id: id, content: {} }));
}

export function upsertConfig<C extends object>(
  data: Types.ConfigData<C, string>
) {
  return axios
    .post<Types.ConfigData<C, string>>('/api/data-forge/config/upsert', data)
    .then(({ data: modified }) => modified);
}

export const removeConfig: Types.RemoveConfigService = async (id) => {
  await axios.delete(`/api/data-forge/config/remove/${id}`);
};
