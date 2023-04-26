export interface ConfigData<C, U = undefined> {
  _id: U;
  content: C;
  mapping?: Record<string, string>;
  timestamp: string;
}
