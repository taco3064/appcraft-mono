import type { NodeWidget } from '@appcraft/types';

import type { CraftedTypeEditorProps } from '../CraftedTypeEditor';
import type { EditorProviderProps } from '../../contexts';
import type { WidgetStructureProps } from '../WidgetStructure';

export type TypeParseProps = Pick<
  CraftedTypeEditorProps<undefined>,
  'disableSelection' | 'parser'
>;

export interface CraftedWidgetEditorProps
  extends Partial<TypeParseProps>,
    Pick<
      WidgetStructureProps<undefined>,
      'renderWidgetTypeSelection' | 'onWidgetChange'
    > {
  defaultValues?: Record<string, unknown>;
  fixedT?: EditorProviderProps['fixedT'];
  widget?: NodeWidget;
}
