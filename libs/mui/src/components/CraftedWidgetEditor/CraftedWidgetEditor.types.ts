import type { NodeWidget } from '@appcraft/types';

import type { CraftedTypeEditorProps } from '../CraftedTypeEditor';
import type { EditorProviderProps } from '../../contexts';
import type { WidgetStructureProps } from '../WidgetStructure';

type BaseProps = Pick<
  CraftedTypeEditorProps<undefined, NodeWidget>,
  'disableSelection'
>;

type FetchOptions = CraftedTypeEditorProps<undefined, NodeWidget>['parser'];

export interface CraftedWidgetEditorProps
  extends BaseProps,
    Pick<
      WidgetStructureProps<undefined>,
      'renderWidgetTypeSelection' | 'onWidgetChange'
    > {
  defaultValues?: Record<string, unknown>;
  fetchOptions: Record<'parser' | 'nodes', FetchOptions>;
  fixedT?: EditorProviderProps<NodeWidget>['fixedT'];
  widget?: NodeWidget;
}
