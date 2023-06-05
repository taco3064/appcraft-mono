import type { EditorAppBarProps } from '../EditorAppBar';
import type { TypeEditorProps } from '../TypeEditor';

export type EditorPartProps<V extends object = object> = Pick<
  TypeEditorProps<V>,
  'typeFile' | 'typeName' | 'disableSelection' | 'parser'
>;

export type CraftedWidgetEditorProps<V extends object = object> =
  EditorAppBarProps & Partial<EditorPartProps<V>>;
