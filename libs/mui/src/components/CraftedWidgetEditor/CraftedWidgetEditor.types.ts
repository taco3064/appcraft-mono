import type { WidgetOptions } from '@appcraft/types';

import type { EditorAppBarProps } from '../EditorAppBar';
import type { TypeEditorProps } from '../TypeEditor';

export type EditorPartProps<V extends object = object> = Pick<
  TypeEditorProps<V>,
  'typeFile' | 'typeName' | 'disableSelection' | 'parser'
>;

export interface CraftedWidgetEditorProps<V extends object = object>
  extends EditorAppBarProps,
    Partial<EditorPartProps<V>> {
  widgets: WidgetOptions[];
}
