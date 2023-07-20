import type { RenderOverridePureItem } from '../../contexts';

export type PropValueHookResult<P> = [
  P | null,
  {
    change: (value: P | null) => void;
    renderOverride?: RenderOverridePureItem;
  }
];
