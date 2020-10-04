import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { task } from '../initial-data';
import classNames from 'classnames';

type TaskType = {
  task: task;
  index: number;
};

const Task: React.FC<TaskType> = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
      <div
        className={classNames('task', {
          'task--isDragging': snapshot.isDragging,
        })}
        {...draggableProps}
        {...dragHandleProps}
        ref={innerRef}
      >
        {task.content}
      </div>
    )}
  </Draggable>
);

export default Task;
