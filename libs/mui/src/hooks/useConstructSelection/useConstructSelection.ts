import { useMemo } from 'react';
import _get from 'lodash.get';

import { getPropPath } from '../usePropertyRouter';
import { useConstructContext, useEditorContext } from '../../contexts';
import type * as Types from './useConstructSelection.types';

const useConstructSelection: Types.ConstructSelectionHook = (
  propPath,
  renderFn
) => {
  const { paths: nodePath, widget, onWidgetChange } = useConstructContext();
  const { values } = useEditorContext();

  const [status, globalPath] = useMemo<[Types.Status, string]>(() => {
    const { construct } = widget;
    const target = _get(widget, nodePath);

    const globalPath = `${getPropPath(nodePath)}${
      Array.isArray(target) ? `[${target.indexOf(values)}]` : ''
    }.props["${propPath}"]`;

    const field = Object.keys(construct).find(
      (status) => globalPath in construct[status as keyof typeof construct]
    ) as Types.Status;

    return [field || null, globalPath];
  }, [propPath, nodePath, values, widget]);

  return [
    status,

    !widget
      ? null
      : renderFn({
          status,
          onStatusChange: (newStatus) => {
            const { construct } = widget;

            onWidgetChange({
              ...widget,
              construct: Object.entries(construct).reduce(
                (result, [field, pathAlias]) => {
                  if (newStatus === field) {
                    pathAlias[globalPath] = `${field}_${Math.random()
                      .toFixed(7)
                      .replace('.', '')}`;
                  } else {
                    delete pathAlias[globalPath];
                  }

                  return { ...result, [field]: pathAlias };
                },
                { state: {}, props: {} }
              ),
            });
          },
        }),
  ];
};

export default useConstructSelection;
