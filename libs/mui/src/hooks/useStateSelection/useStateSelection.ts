import _get from 'lodash/get';
import _set from 'lodash/set';
import { useTransition } from 'react';

import { getPropPath } from '../../utils';
import { useStateContext } from '../../contexts';
import type { StateSelectionHook } from './useStateSelection.types';

const useStateSelection: StateSelectionHook = (
  type,
  alias,
  propPath,
  renderFn
) => {
  const { basePath, values, onChange } = useStateContext();
  const [, startTransition] = useTransition();

  const path = getPropPath(
    Array.isArray(propPath) ? propPath : [basePath, 'props', propPath]
  );

  const checked = Boolean(_get(values, ['state', type, path]));

  return [
    checked,

    !values
      ? null
      : renderFn({
          checked,
          onSelect: (newChecked) => {
            const state = _get(values, ['state', type]) || {};

            if (!newChecked) {
              delete state[path];
            } else {
              state[path] = {
                alias,
                description: '',
                defaultValue: undefined,
              };
            }

            startTransition(() =>
              onChange(_set(values, ['state', type], { ...state }))
            );
          },
        }),
  ];
};

export default useStateSelection;
