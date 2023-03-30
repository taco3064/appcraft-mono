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

export const useAuthTokens: Types.UserAutTokensHook = () => {
  const tokens = useSettingStore(
    ({ tokens }) => tokens,
    (t1, t2) => t1 === t2
  );

  return {
    authorized: Object.values(tokens).every((token) => token),
    tokens,
  };
};

export const useSettingModified: Types.SettingModifiedHook = () =>
  useSettingStore(({ lng, setLng }) => ({
    lng,
    setLng,
  }));
