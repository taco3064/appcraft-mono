import i18n from 'i18next';
import { create } from 'zustand';

import resources from '@alienfast/i18next-loader?relativePathAsNamespace=true!~appcraft/assets/locales';
import type * as Types from './useSetting.types';

//* i18next
const initialLng: string =
  global.localStorage?.getItem('lng') || __WEBPACK_DEFINE__.LANGUAGES[0];

i18n.init({
  keySeparator: '.',
  resources,
  lng: initialLng,
  fallbackLng: {
    default: __WEBPACK_DEFINE__.LANGUAGES,
  },
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
});

//* Zustand Store
const useSettingStore = create<Types.SettingState>((set, get) => ({
  token:
    global.document?.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() ||
    null,

  //* Locales
  lng: initialLng,
  getFixedT: (namespace) => i18n.getFixedT(null, namespace),
  setLng: (lng) =>
    set(({ lng: current }) => {
      const newLng = __WEBPACK_DEFINE__.LANGUAGES.includes(lng) ? lng : current;

      if (newLng !== current) {
        i18n.changeLanguage(newLng);
        global.localStorage?.setItem('lng', newLng);
      }

      return {
        lng: newLng,
      };
    }),
}));

export default useSettingStore;
