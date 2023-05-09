import React from 'react';
import type { ReactNode } from 'react';

import type { NodePickerFn, PartialNodes } from './useNodePicker.types';

export const useNodePickHandle = <K extends string>(
  targets: K[]
): [PartialNodes<K>, NodePickerFn<K>] => {
  const [action, setAction] = React.useState<PartialNodes<K>>(null);

  return [
    action,

    React.useCallback(
      (nodes: Record<K, ReactNode>) => {
        const { action: newAction, result } = (
          Object.keys(nodes) as K[]
        ).reduce<{
          action: PartialNodes<K>;
          result: PartialNodes<K>;
        }>(
          (result, key) => {
            const to = targets.includes(key) ? 'action' : 'result';
            const { [key]: node } = nodes;
            const { [to]: temp } = result;

            return {
              ...result,
              [to]: {
                ...temp,
                [key]: node,
              },
            };
          },
          { action, result: null }
        );

        setAction(newAction);

        return result || {};
      },
      [targets]
    ),
  ];
};

export const useNodePicker = <K extends string>(
  pickerFn: NodePickerFn<K>,
  nodes: Record<K, ReactNode>,
  deps: Array<unknown> = []
) =>
  React.useMemo(
    () =>
      React.lazy(async () => {
        const result = Object.entries<ReactNode>(pickerFn(nodes) || {});

        return await Promise.resolve({
          default: () => (
            <>
              {result.map(([key, node]) => (
                <React.Fragment key={key}>{node}</React.Fragment>
              ))}
            </>
          ),
        });
      }),
    deps
  );
