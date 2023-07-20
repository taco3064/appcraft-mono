import type { RenderOverridePureItem } from '../../contexts';

export type PropValueHookResult<P> = [
  {
    value: P | null;
    typeFile: string;
    typeName: string;
  },
  {
    change: (value: P | null) => void;
    renderOverride?: RenderOverridePureItem;
  }
];
