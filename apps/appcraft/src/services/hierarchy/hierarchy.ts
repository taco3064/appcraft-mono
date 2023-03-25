import axios from 'axios';
import type * as Types from './hierarchy.types';

export const searchHierarchy: Types.SearchHierarchyService = async (
  category,
  params
) => {
  const { data } = await axios.post(
    `/api/data-forge/hierarchy/search/${category}`,
    params
  );

  return data;
};

export const addHierarchy: Types.AddHierarchyService = async (hierarchy) => {
  const { data } = await axios.post('/api/data-forge/hierarchy/add', hierarchy);

  return data;
};
