import _get from 'lodash.get';
import _set from 'lodash.set';

import type { WidgetMutationHook } from './useWidgetMutation.types';

const useWidgetMutation: WidgetMutationHook = (
  widget,
  isMultiChildren,
  paths,
  onWidgetChange
) => {
  const target = _get(widget, paths || []) || [];
  const items = Array.isArray(target) ? target : [target];

  return {
    onWidgetAdd: (e) =>
      onWidgetChange(
        !paths?.length
          ? {
              ...widget,
              ...e,
              category: 'node',
            }
          : {
              ..._set(
                widget,
                paths,
                !isMultiChildren
                  ? { ...e, category: 'node' }
                  : [...items, { ...e, category: 'node' }]
              ),
            }
      ),

    onWidgetRemove: (e) =>
      onWidgetChange(
        e === widget || !paths?.length
          ? null
          : {
              ..._set(
                widget,
                paths,
                !isMultiChildren
                  ? undefined
                  : items.filter((item) => item !== e)
              ),
            }
      ),
  };
};

export default useWidgetMutation;
