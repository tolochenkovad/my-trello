import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { column, task } from '../initial-data';
import classNames from 'classnames';
import Task from '../Task';

type ColumnType = {
  column: column;
  tasks: task[];
};

const Column: React.FC<ColumnType> = ({ column, tasks }) => {
  console.log('render Column');
  return (
    <div className="column">
      <h3 className="column__title">{column.title}</h3>
      <Droppable droppableId={column.id} type="TASK">
        {({ droppableProps, innerRef, placeholder }, snapshot) => (
          <div
            className={classNames('column__task-list', {
              'column__task-list--isDraggingOver': snapshot.isDraggingOver,
            })}
            ref={innerRef}
            {...droppableProps}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
