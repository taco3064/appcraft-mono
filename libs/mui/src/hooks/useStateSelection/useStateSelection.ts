import _set from 'lodash/set';
import { getPropPath } from '../../utils';
import { useStateContext } from '../../contexts';
import type { StateSelectionHook } from './useStateSelection.types';

const useStateSelection: StateSelectionHook = (propPath, renderFn) => {
  const { basePath, values, onChange } = useStateContext();
  const path = getPropPath([basePath, 'props', propPath]);
  const checked = path in (values?.state || {});

  return [
    checked,

    !values
      ? null
      : renderFn({
          checked,
          onSelect: (newChecked) => {
            const { state = {} } = values;

            _set(
              state,
              [path],
              !newChecked
                ? undefined
                : {
                    alias: propPath,
                    description: '',
                    defaultValue: undefined,
                  }
            );

            onChange({ ...values, state });
          },
        }),
  ];
};

export default useStateSelection;
