import useSettingStore from './useSetting.hooks';
import * as Types from './useSetting.types';

export const useFixedT: Types.FixedTHook = (...namespaces) => {
  const { getFixedT } = useSettingStore(
    ({ lng, getFixedT }) => ({
      lng,
      getFixedT,
    }),
    ({ lng: l1 }, { lng: l2 }) => l1 === l2
  );

  return namespaces.map((namespace) => getFixedT(namespace));
};
