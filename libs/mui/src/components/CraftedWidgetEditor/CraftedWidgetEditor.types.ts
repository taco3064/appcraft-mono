import type { CraftedTypeEditorProps } from '../CraftedTypeEditor';
import type { WidgetAppBarProps } from '../common';

export type TypeParseProps = Pick<
  CraftedTypeEditorProps,
  'typeFile' | 'typeName' | 'disableSelection' | 'parser'
>;

export interface CraftedWidgetEditorProps
  extends Omit<WidgetAppBarProps, 'onBackToStructure'>,
    Partial<TypeParseProps> {
  defaultValues?: Record<string, unknown>;
}
