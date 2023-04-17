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

export const getHierarchyNames: Types.GetHierarchyNamesService = async ({
  queryKey: [category, ids],
}) => {
  const { data } = await axios.post(
    `/api/data-forge/hierarchy/getNames/${category}`,
    ids
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
  const { data } = await axios.put(
    '/api/data-forge/hierarchy/update',
    hierarchy
  );

  return data;
};

export const removeHierarchy: Types.RemoveHierarchyService = async (
  hierarchy
) => {
  await axios.delete(`/api/data-forge/hierarchy/remove?id=${hierarchy._id}`);
};
