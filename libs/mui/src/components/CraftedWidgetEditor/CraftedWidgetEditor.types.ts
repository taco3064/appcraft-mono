import type { FetchOptions, NodeWidget } from '@appcraft/types';

import type { ChangeHandler, FixedT } from '../../contexts';
import type { WidgetStructureProps } from '../WidgetStructure';

export interface CraftedWidgetEditorProps
  extends Pick<WidgetStructureProps<undefined>, 'renderWidgetTypeSelection'> {
  defaultValues?: Record<string, unknown>;
  disableSelection?: boolean;
  fetchOptions: Record<'parser' | 'nodes', FetchOptions>;
  fixedT?: FixedT;
  widget?: NodeWidget;
  onWidgetChange: ChangeHandler<NodeWidget>;
}
