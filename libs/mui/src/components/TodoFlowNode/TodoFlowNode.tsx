import Typography from '@mui/material/Typography';
import { Position, useReactFlow } from 'reactflow';

import { TodoHandle, TodoNodeLabel } from '../../styles';
import type { TodoFlowNodeProps } from './TodoFlowNode.types';

export default function TodoFlowNode({ data }: TodoFlowNodeProps) {
  const { id, category, description } = data;
  const { deleteElements } = useReactFlow();

  return (
    <>
      <TodoHandle type="target" position={Position.Top} />

      <TodoNodeLabel
        category={category}
        primary={description}
        secondary={
          <>
            {category}

            <Typography variant="caption" textTransform="none">
              ({id})
            </Typography>
          </>
        }
        onDelete={() => deleteElements({ nodes: [{ id }] })}
      />

      <TodoHandle
        type="source"
        id="defaultNextTodo"
        position={Position.Bottom}
      />

      {category === 'branch' && (
        <TodoHandle type="source" id="metTodo" position={Position.Right} />
      )}

      {category === 'iterate' && (
        <TodoHandle type="source" id="iterateTodo" position={Position.Right} />
      )}
    </>
  );
}
