import type { RenderOverrideItem } from '../../contexts';

export type PropValueHookResult<P> = [
  {
    props: object;
    value: P | null;
    typeFile: string;
    typeName: string;
  },
  {
    change: (value: P | null) => void;
    renderOverride?: RenderOverrideItem;
  }
];
