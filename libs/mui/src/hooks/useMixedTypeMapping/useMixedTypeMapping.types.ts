import type { OneOfTypeOptions } from '@appcraft/types';

export type MixedTypeMappingResult = [
  string | null,
  (mixedText?: string) => void
];

export type MixedTypeMappingHook = (
  propPath: string,
  options: OneOfTypeOptions[]
) => MixedTypeMappingResult;
