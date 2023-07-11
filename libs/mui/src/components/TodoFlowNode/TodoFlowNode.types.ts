import type { NodeProps } from 'reactflow';
import type { TodoNode } from '../../hooks';

export type TodoFlowNodeProps = NodeProps<TodoNode['data']>;
