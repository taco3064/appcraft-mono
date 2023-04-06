import axios from 'axios';
import type * as Types from './hierarchy.types';

export const searchHierarchy: Types.SearchHierarchyService = async ({
  queryKey: [category, params],
}) => {
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

export const updateHierarchy: Types.UpdateHierarchyService = async (
  hierarchy
) => {
  return hierarchy;
};

export const removeHierarchy: Types.RemoveHierarchyService = async (
  hierarchy
) => {};
