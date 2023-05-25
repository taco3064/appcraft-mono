import type { WidgetOptions } from '@appcraft/types';

import type { EditorAppBarProps } from '../EditorAppBar';
import type { NestedElementsProps } from '../NestedElements';
import type { TypeEditorProps } from '../TypeEditor';

export type EditorPartProps<V extends object = object> = Pick<
  TypeEditorProps<V>,
  'typeFile' | 'typeName' | 'disableSelection' | 'parser'
>;

export interface CraftedEditorProps<V extends object = object>
  extends EditorAppBarProps,
    Partial<EditorPartProps<V>>,
    Pick<NestedElementsProps, 'onWidgetSelect'> {
  widgets: WidgetOptions[];
}
