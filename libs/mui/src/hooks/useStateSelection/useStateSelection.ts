import { getPropPath } from '../../utils';
import { useStateContext } from '../../contexts';
import type { StateSelectionHook } from './useStateSelection.types';

const useStateSelection: StateSelectionHook = (propPath, renderFn) => {
  const { basePath, values, onChange } = useStateContext();
  const path = getPropPath([basePath, propPath]);
  const checked = path in (values?.state || {});

  return [
    checked,

    renderFn({
      checked,
      onSelect: (newChecked) => {
        const { state = {} } = values;

        if (newChecked) {
          state[path] = undefined;
        } else {
          delete state[path];
        }

        onChange({ ...values, state });
      },
    }),
  ];
};

export default useStateSelection;
