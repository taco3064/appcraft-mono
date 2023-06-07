import type { NodeWidget } from '@appcraft/types';

import type { TypeEditorProps } from '../TypeEditor';
import type { WidgetAppBarProps } from '../common';

export type EditorPartProps = Pick<
  TypeEditorProps,
  'typeFile' | 'typeName' | 'disableSelection' | 'parser'
>;

export interface CraftedWidgetEditorProps
  extends Omit<WidgetAppBarProps, 'onBackToElements'>,
    Partial<EditorPartProps> {
  defaultValues?: Record<string, unknown>;
}
