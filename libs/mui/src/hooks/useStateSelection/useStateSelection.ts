import _get from 'lodash/get';
import _set from 'lodash/set';
import { useTransition } from 'react';

import * as Util from '../../utils';
import { useStateContext } from '../../contexts';
import type { StateSelectionHook } from './useStateSelection.types';

const useStateSelection: StateSelectionHook = (
  generator,
  alias,
  propPath,
  renderFn
) => {
  const { basePath, values, onChange } = useStateContext();
  const [, startTransition] = useTransition();
  const category = Util.getStateCategory(generator);

  const path = Util.getPropPath(
    Array.isArray(propPath) ? propPath : [basePath, 'props', propPath]
  );

  const checked = Boolean(_get(values, ['state', category, path]));

  return [
    checked,

    !values
      ? null
      : renderFn({
          checked,
          onSelect: (newChecked) => {
            const state = _get(values, ['state', category]) || {};

            if (!newChecked) {
              delete state[path];
            } else {
              state[path] = Util.getInitialState(generator, alias);
            }

            startTransition(() =>
              onChange(_set(values, ['state', category], { ...state }))
            );
          },
        }),
  ];
};

export default useStateSelection;
