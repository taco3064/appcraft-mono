import axios from 'axios';
import { getNodesAndEventsKey } from '@appcraft/mui';
import type { NodeAndEventProps } from '@appcraft/types';

import { getDB } from '../common';
import type * as Types from './ts-parser.types';

export const getTypeDefinition: Types.GetTypeDefinitionService = async (
  parser,
  { typeFile, typeName, mixedTypes, collectionPath }
) => {
  const { data: fetchData } = !(typeFile && typeName)
    ? { data: null }
    : await axios.post(`/api/ts2-props/types-resolve/${parser}`, {
        typeFile,
        typeName,
        mixedTypes,
        collectionPath,
      });

  return fetchData;
};

export const getNodesAndEvents: Types.GetNodesAndEventsService = async (
  items,
  version
) => {
  const db = await getDB(version);
  const targets: Types.ParseOptions[] = [];
  const data: NodeAndEventProps = { nodes: {}, events: {} };

  for await (const item of items) {
    if (item.category === 'node') {
      const key = getNodesAndEventsKey(item);
      const node = await db?.get('nodes', key);
      const event = await db?.get('events', key);

      if (node) {
        data.nodes[key] = node;
      }

      if (event) {
        data.events[key] = event;
      }

      if (!node && !event) {
        targets.push({ typeFile: item.typeFile, typeName: item.typeName });
      }
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
    db?.put('nodes', value, key)
  );

  Object.entries(fetchEvents).forEach(([key, value]) => {
    db?.put('events', value, key);
  });

  return {
    nodes: { ...data.nodes, ...fetchNdoes },
    events: { ...data.events, ...fetchEvents },
  };
};
