import _get from 'lodash/get';
import _set from 'lodash/set';
import { ExhibitorUtil } from '@appcraft/exhibitor';

import * as Util from '../../utils';
import { useStateContext } from '../../contexts';
import type { StateSelectionHook } from './useStateSelection.types';

export const useStateSelection: StateSelectionHook = (
  generator,
  alias,
  propPath,
  renderFn
) => {
  const { basePath, disabled, values, onChange } = useStateContext();
  const category = Util.getStateCategory(generator);

  const path = ExhibitorUtil.getPropPath(
    Array.isArray(propPath) ? propPath : [basePath, 'props', propPath]
  );

  const checked = Boolean(_get(values, ['state', category, path]));

  return [
    disabled ? false : checked,

    !values || disabled
      ? null
      : renderFn({
          checked,
          onSelect: (newChecked, options) => {
            const { state: { [category]: state = {}, ...$state } = {} } =
              values;

            if (newChecked) {
              state[path] = Util.getInitialState(generator, alias, options);
            } else {
              delete state[path];
            }

            onChange({
              ..._set(values, 'state', {
                ...$state,
                [category]: state,
              }),
            });
          },
        }),
  ];
};
