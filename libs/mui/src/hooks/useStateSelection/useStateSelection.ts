import _get from 'lodash/get';
import _set from 'lodash/set';

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
            const { state: { [category]: state = {}, ...$state } = {} } =
              values;

            if (newChecked) {
              state[path] = Util.getInitialState(generator, alias);
            } else {
              delete state[path];
            }

            onChange({
              ...values,
              state: {
                ...$state,
                [category]: state,
              },
            });
          },
        }),
  ];
};

export default useStateSelection;
