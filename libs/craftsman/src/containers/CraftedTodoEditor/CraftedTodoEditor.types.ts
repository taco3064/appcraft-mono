import type * as Appcraft from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';

import type * as Comp from '../../components';
import type * as Hook from '../../hooks';
import type { CraftedTypeEditorProps } from '../CraftedTypeEditor';
import type { GeneratedOverride } from '../../utils';

//* Component Props
export type LazyTodoInputSelectProps = Omit<
  Comp.TodoInputSelectProps,
  'definition'
>;

export type LazyTodoOutputSelectProps = Omit<
  Comp.TodoOutputSelectProps,
  'defaultTodos'
>;

export interface CraftedTodoEditorProps
  extends Pick<Comp.TodoFlowControlsProps, 'disableCategories'>,
    Pick<
      CraftedTypeEditorProps<Appcraft.ConfigOptions>,
      'HeaderProps' | 'fullHeight' | 'renderOverrideItem'
    > {
  GeneratedOverrideProps?: GeneratedOverride;
  typeFile?: string;
  values?: Record<string, Appcraft.WidgetTodo>;
  variant?: 'normal' | 'popup';
  onChange: Hook.TodoChangeHandler;
  onEditToggle?: Hook.EditToggleHandler;
  onFetchData: Exhibitor.FetchDataHandler;
  onFetchWrapper: Exhibitor.FetchWrapperHandler<'todo' | 'widget'>;
  onFetchDefinition: Hook.FetchTypeDefinition<
    Appcraft.StructureProp | Appcraft.FuncProp
  >;
}
