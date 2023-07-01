import axios from 'axios';
import type * as Types from './nodes-and-events.types';

export const getNodesAndEvents: Types.GetNodesAndEventsService = async (
  fetchOptions,
  items,
  version
) => {
  const targets = items.reduce<Types.ParseOptions[]>((result, item) => {
    const { typeFile = null, typeName = null } =
      item.category === 'node' ? item : {};

    if (typeFile && typeName) {
      result.push({ typeFile, typeName });
    }

    return result;
  }, []);

  const { data: fetchData } =
    (targets.length && (await axios({ ...fetchOptions, data: targets }))) || {};

  return fetchData;
};
