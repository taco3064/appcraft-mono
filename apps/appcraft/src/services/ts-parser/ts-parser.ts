import axios from 'axios';
import { CraftsmanUtil } from '@appcraft/craftsman';
import type { NodeAndEventProps } from '@appcraft/types';

import { getDB } from '../common';
import type * as Types from './ts-parser.types';

export const getTypeDefinition: Types.GetTypeDefinitionService = async ({
  typeFile,
  typeName,
  mixedTypes,
  collectionPath,
}) => {
  //* Note: typeFile 的 replace 處理是為了本機端開發時，可以直接使用本機端的檔案
  const overrideFile = !__WEBPACK_DEFINE__.LOCAL_MODE
    ? typeFile
    : typeFile
        .replace('./node_modules/@appcraft/widgets/', './libs/widgets/')
        .replace(/\.d\.ts/, '.tsx');

  const { data: fetchData } = !(typeFile && typeName)
    ? { data: null }
    : await axios.post('/api/ts2-props/types-resolve/parse', {
        typeFile: overrideFile,
        typeName,
        mixedTypes,
        collectionPath,
      });

  return fetchData;
};

export const getNodesAndEvents: Types.GetNodesAndEventsService = async (
  options,
  version
) => {
  const db = await getDB(version);
  const targets: Types.ParseOptions[] = [];
  const data: NodeAndEventProps = { nodes: {}, events: {} };

  for await (const { typeFile, typeName } of options) {
    const key = CraftsmanUtil.getNodesAndEventsKey({
      category: 'node',
      typeFile,
      typeName,
    });

    const node = await db?.get('nodes', key);
    const event = await db?.get('events', key);

    if (node) {
      data.nodes[key] = node;
    }

    if (event) {
      data.events[key] = event;
    }

    if (!node && !event) {
      //* Note: typeFile 的 replace 處理是為了本機端開發時，可以直接使用本機端的檔案
      targets.push({
        typeName,
        typeFile: !__WEBPACK_DEFINE__.LOCAL_MODE
          ? typeFile
          : typeFile
              .replace('./node_modules/@appcraft/widgets/', './libs/widgets/')
              .replace(/\.d\.ts/, '.tsx'),
      });
    }
  }

  const {
    data: { nodes: fetchNdoes = {}, events: fetchEvents = {} },
  }: { data: Partial<NodeAndEventProps> } = (targets.length &&
    (await axios.post(
      '/api/ts2-props/types-resolve/getNodesAndEvents',
      targets
    ))) || { data: {} };

  //* Note: key 需要 replace 回原本的，才確保 idb 正常運作
  return {
    nodes: {
      ...data.nodes,
      ...Object.entries(fetchNdoes).reduce((result, [key, value]) => {
        const $key = !__WEBPACK_DEFINE__.LOCAL_MODE
          ? key
          : key
              .replace('./libs/widgets/', './node_modules/@appcraft/widgets/')
              .replace(/\.tsx#/, '.d.ts#');

        db?.put('nodes', value, $key);

        return { ...result, [$key]: value };
      }, {}),
    },
    events: {
      ...data.events,
      ...Object.entries(fetchEvents).reduce((result, [key, value]) => {
        const $key = !__WEBPACK_DEFINE__.LOCAL_MODE
          ? key
          : key
              .replace('./libs/widgets/', './node_modules/@appcraft/widgets/')
              .replace(/\.tsx#/, '.d.ts#');

        db?.put('events', value, $key);

        return { ...result, [$key]: value };
      }, {}),
    },
  };
};
