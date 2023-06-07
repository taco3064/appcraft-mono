import type { MouseEventHandler, ReactElement } from 'react';
import type { NodeWidget } from '@appcraft/types';

import type { ChangeHandler, EditorProviderProps } from '../../contexts';
import type { TypeEditorProps } from '../TypeEditor';

export type EditorPartProps<V extends object = object> = Pick<
  TypeEditorProps<V>,
  'typeFile' | 'typeName' | 'disableSelection' | 'parser'
>;

export interface CraftedWidgetEditorProps<V extends object = object>
  extends Pick<EditorProviderProps, 'fixedT'>,
    Partial<EditorPartProps<V>> {
  widgetTypeSelection: ReactElement;
  widget?: NodeWidget;
  onBackToElements: MouseEventHandler<HTMLButtonElement>;
  onWidgetAdd: (id: string) => void;
  onWidgetChange: ChangeHandler<keyof NodeWidget>;
  onWidgetSelect: (id: string) => void;
}
