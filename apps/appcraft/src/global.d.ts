declare module '@alienfast/i18next-loader?relativePathAsNamespace=true!*' {
  const contents: import('i18next').Resource;

  export default contents;
}

declare module '~appcraft/assets/json/types-fetch-options.json' {
  interface FetchOptions {
    url: string;
    method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
  }

  export const CONFIGS_PARSER: FetchOptions;
  export const GET_NODES_AND_EVENTS: FetchOptions;
  export const PROPS_PARSER: FetchOptions;
}

declare const __WEBPACK_DEFINE__: {
  ENV: 'development' | 'production';
  LANGUAGES: string[];
  VERSION: string;
};
