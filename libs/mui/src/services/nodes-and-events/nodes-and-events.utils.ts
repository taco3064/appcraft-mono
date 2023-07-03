import type { GetNodesAndEventsKeyUtil } from './nodes-and-events.types';

export const getNodesAndEventsKey: GetNodesAndEventsKeyUtil = (
  options,
  defaultKey = ''
) =>
  options.category === 'node'
    ? `${options.typeFile}#${options.typeName}`
    : defaultKey;
