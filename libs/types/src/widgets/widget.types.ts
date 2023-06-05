import type { TypesMapping } from '../services/config.types';

interface BaseWidget {
  id: string;
  description?: string;
}

interface PlainTextWidget extends BaseWidget {
  content: string;
}

interface NodeWidget<
  E extends string[] = [],
  N extends string[] = [],
  P extends string[] = []
> extends BaseWidget {
  type: string;
  mapping?: TypesMapping;
  props?: Record<string, unknown>;
  events?: Record<string, unknown>;

  nodes?: Partial<
    Record<E[number], NodeWidget> &
      Record<N[number], NodeWidget[]> &
      Record<P[number], PlainTextWidget>
  >;
}

export type WidgetOptions = PlainTextWidget | NodeWidget;
