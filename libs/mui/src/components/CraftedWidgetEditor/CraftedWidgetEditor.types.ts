import type { NodeWidget } from '@appcraft/types';

import type { ChangeHandler, FixedT } from '../../contexts';
import type { FetchOptions } from '../CraftedTypeEditor';
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
