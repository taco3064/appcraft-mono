import i18n from 'i18next';
import { create } from 'zustand';

import resources from '@alienfast/i18next-loader?relativePathAsNamespace=true!~appcraft/assets/locales';
import type * as Types from './useApp.types';

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
const useAppStore = create<Types.AppState>((set, get) => ({
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

  //* Theme
  theme: global.localStorage?.getItem('theme') || 'SPARKLING_CHAMPAGNE',
  setTheme: (theme, timestamp) => {
    global.localStorage?.setItem('theme', theme);
    set({ theme, timestamp });
  },
}));

export default useAppStore;
