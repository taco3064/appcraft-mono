import type { NodeProps } from 'reactflow';
import type { TodoNode } from '../../utils';

export type TodoFlowNodeProps = NodeProps<TodoNode['data']>;
