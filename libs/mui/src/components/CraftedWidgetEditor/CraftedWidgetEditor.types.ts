import type { FetchOptions, NodeWidget } from '@appcraft/types';

import type { FixedT } from '../../contexts';
import type { WidgetStructureProps } from '../WidgetStructure';

export interface CraftedWidgetEditorProps
  extends Pick<
    WidgetStructureProps<undefined>,
    'renderWidgetTypeSelection' | 'onWidgetChange'
  > {
  defaultValues?: Record<string, unknown>;
  disableSelection?: boolean;
  fetchOptions: Record<'parser' | 'nodes', FetchOptions>;
  fixedT?: FixedT;
  widget?: NodeWidget;
}
