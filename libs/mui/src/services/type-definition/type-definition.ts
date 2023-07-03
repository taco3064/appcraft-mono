import axios from 'axios';
import type * as Types from './type-definition.types';

export const getTypeDefinition: Types.GetTypeDefinitionService = async (
  fetchOptions,
  { typeFile, typeName, mixedTypes, collectionPath }
) => {
  const { data: fetchData } = !(typeFile && typeName)
    ? { data: null }
    : await axios({
        ...fetchOptions,
        data: {
          typeFile,
          typeName,
          mixedTypes,
          collectionPath,
        },
      });

  return fetchData;
};
