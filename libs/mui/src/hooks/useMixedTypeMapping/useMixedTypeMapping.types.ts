export type MixedTypeMappingResult = [
  string | null,
  (mixedText?: string) => void
];

export type MixedTypeMappingHook = (propPath: string) => MixedTypeMappingResult;
