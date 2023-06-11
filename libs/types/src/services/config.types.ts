export type TypesMapping = Record<string, string>;

export interface ConfigData<C, U = undefined> {
  _id: U;
  content: C;
  mapping?: TypesMapping;
  timestamp: string;
}
