import type * as Appcraft from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';

import { WidgetAppBar } from '../../styles';
import type * as Comp from '../../components';
import type * as Ctx from '../../contexts';
import type * as Hook from '../../hooks';
import type { CraftedTodoEditorProps } from '../CraftedTodoEditor';

//* Variables
type GeneratedOverrideProps = Exclude<
  CraftedTodoEditorProps['GeneratedOverrideProps'],
  undefined
>;

type CheckAllowedToAddWidget = (e: {
  owner?: Appcraft.NodeWidget;
  paths: (string | number)[];
  type: Appcraft.NodeType;
  childrenCount: number;
}) => boolean;

type RenderNewWidgetDialog = (options: {
  type: Appcraft.NodeType;
  paths: (string | number)[];
  open: boolean;
  onClose: () => void;
}) => ReactElement<DialogProps, typeof Dialog>;

//* Methods
export type GetActiveType = (options: {
  editedWidgetCategory?: 'node' | 'plainText';
  stateOpen: boolean;
  todoPath?: string;
}) => 'state' | 'todos' | 'props' | 'nodes';

//* Component Props
export type LazyWidgetElementsProps = Omit<
  Comp.WidgetElementProps<Appcraft.EntityWidgets>,
  'index' | 'item' | 'event' | 'node' | 'defaultOpen'
> & {
  widgets: Appcraft.EntityWidgets[];
};

//* Component Props
export interface CraftedWidgetEditorProps {
  BackButtonProps?: ComponentProps<typeof WidgetAppBar>['BackButtonProps'];
  GeneratedTodoOverrideProps?: Pick<GeneratedOverrideProps, 'layout'>;
  disableSelection?: boolean;
  disableTodoCategories?: Comp.TodoFlowControlsProps['disableCategories'];
  stateTypeFile?: string;
  title?: ReactNode;
  todoTypeFile?: string;
  version?: string;
  widget: Appcraft.MainWidget;
  isAllowedToAddWidget?: CheckAllowedToAddWidget;
  overrideMixedOptions?: Ctx.OverrideMixedOptions;
  overrideNamingProps?: Ctx.OverrideNamingProps;
  renderNewWidgetDialog?: RenderNewWidgetDialog;
  renderOverrideItem?: Ctx.RenderOverrideItem;
  onFetchNodesAndEvents: Hook.FetchNodesAndEvents;
  onFetchData: Exhibitor.FetchDataHandler;
  onFetchDefinition: Hook.FetchTypeDefinition;
  onFetchWrapper: Exhibitor.FetchWrapperHandler<'widget' | 'todo'>;
  onWidgetChange: (e: Appcraft.MainWidget | null) => void;
}
