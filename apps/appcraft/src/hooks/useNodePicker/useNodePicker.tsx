import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
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
      [action, targets]
    ),
  ];
};

export const useNodePicker = <K extends string, D extends React.DependencyList>(
  pickerFn: (unmount?: boolean) => Partial<Record<K, ReactNode>>,
  deps: D
) => {
  const ref = React.useRef(pickerFn);

  const { data: action } = useQuery({
    suspense: false,
    queryKey: deps,
    queryFn: () => pickerFn(),
  });

  React.useEffect(
    () => () => {
      ref.current?.(true);
    },
    []
  );

  return (
    <>
      {Object.entries<ReactNode>(action || {}).map(([key, node]) => (
        <React.Fragment key={key}>{node}</React.Fragment>
      ))}
    </>
  );
};
