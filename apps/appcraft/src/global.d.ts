declare module '@alienfast/i18next-loader?relativePathAsNamespace=true!*' {
  const contents: import('i18next').Resource;

  export default contents;
}

declare const __WEBPACK_DEFINE__: Record<string, string> & {
  ENV: 'development' | 'production';
  LANGUAGES: string[];
};
