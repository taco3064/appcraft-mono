import axios from 'axios';
import type * as Types from './hierarchy.types';

export const searchHierarchy: Types.SearchHierarchyService = async ({
  queryKey: [category, keyword, superior],
}) => {
  const { data } = await axios.post(
    `/api/data-forge/hierarchy/search/${category}`,
    { keyword, superior }
  );

  return data;
};

export const addHierarchy: Types.AddHierarchyService = async (hierarchy) => {
  const { data } = await axios.post('/api/data-forge/hierarchy/add', hierarchy);

  return data;
};

export const updateHierarchy: Types.UpdateHierarchyService = async (
  hierarchy
) => {
  return hierarchy;
};
