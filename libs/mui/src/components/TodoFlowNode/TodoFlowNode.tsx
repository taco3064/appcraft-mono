import Tooltip from '@mui/material/Tooltip';
import { Position, useReactFlow } from 'reactflow';

import { TodoHandle, TodoNodeLabel } from '../../styles';
import type { TodoFlowNodeProps } from './TodoFlowNode.types';

export default function TodoFlowNode({ data }: TodoFlowNodeProps) {
  const { id, category, description } = data;
  const { deleteElements, getEdges } = useReactFlow();

  return (
    <>
      <TodoHandle type="target" position={Position.Top} />

      <TodoNodeLabel
        category={category}
        primary={description}
        secondary={category}
        onDelete={() => deleteElements({ nodes: [{ id }] })}
      />

      {/^(variable|fetch)$/.test(category) && (
        <TodoHandle
          type="source"
          id="defaultNextTodo"
          position={Position.Bottom}
        />
      )}

      {category === 'branch' && (
        <>
          <Tooltip title="No">
            <TodoHandle
              type="source"
              id="defaultNextTodo"
              position={Position.Left}
            />
          </Tooltip>

          <Tooltip title="Yes">
            <TodoHandle type="source" id="metTodo" position={Position.Right} />
          </Tooltip>
        </>
      )}

      {category === 'iterate' && (
        <>
          <Tooltip title="Completed">
            <TodoHandle
              type="source"
              id="defaultNextTodo"
              position={Position.Left}
            />
          </Tooltip>

          <Tooltip title="Iterate">
            <TodoHandle
              type="source"
              id="iterateTodo"
              position={Position.Right}
            />
          </Tooltip>
        </>
      )}
    </>
  );
}
