import type { NodeWidget, TypesParseOptions } from '@appcraft/types';

import type { ActionElement, Collapsable } from '../CraftedTypeEditor';
import type { ChangeHandler, FixedT } from '../../contexts';
import type { FetchOptions } from '../CraftedTypeEditor';
import type { WidgetAddDialogProps } from '../WidgetAddDialog';

export type ParseOptions = Pick<TypesParseOptions, 'typeFile' | 'typeName'>;

export type WidgetStructureProps<A extends ActionElement> = Collapsable<
  Pick<WidgetAddDialogProps, 'renderWidgetTypeSelection'> & {
    fixedT?: FixedT;
    nodes: FetchOptions;
    widget?: NodeWidget;
    onWidgetChange: ChangeHandler<NodeWidget>;
    onWidgetSelect: (widget: NodeWidget) => void;
  },
  A
>;
