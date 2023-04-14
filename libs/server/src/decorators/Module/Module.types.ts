export interface DefaultImplement {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (...args: any[]): {};
}

export interface DecoratorOptions {
  base: string;
}
