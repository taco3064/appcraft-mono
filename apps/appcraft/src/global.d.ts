declare module '@alienfast/i18next-loader?relativePathAsNamespace=true!*' {
  const contents: import('i18next').Resource;

  export default contents;
}

declare const __WEBPACK_DEFINE__: {
  ENV: 'development' | 'production';
  LANGUAGES: string[];
  LOCAL_MODE: boolean;
  MUI_ICONS: string[];
  STATE_TYPE_FILE: string;
  TODO_TYPE_FILE: string;
  VERSION: string;
};
