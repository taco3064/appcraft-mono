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

  Object.entries(fetchNdoes).forEach(([key, value]) =>
    db?.put(
      'nodes',
      value,
      !__WEBPACK_DEFINE__.LOCAL_MODE
        ? key
        : key
            .replace('./libs/widgets/', './node_modules/@appcraft/widgets/')
            .replace(/\.tsx#/, '.d.ts#')
    )
  );

  Object.entries(fetchEvents).forEach(([key, value]) => {
    db?.put(
      'events',
      value,
      !__WEBPACK_DEFINE__.LOCAL_MODE
        ? key
        : key
            .replace('./libs/widgets/', './node_modules/@appcraft/widgets/')
            .replace(/\.tsx#/, '.d.ts#')
    );
  });

  return {
    nodes: { ...data.nodes, ...fetchNdoes },
    events: { ...data.events, ...fetchEvents },
  };
};
