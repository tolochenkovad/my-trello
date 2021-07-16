import React, { FC, memo } from 'react';
import { isEqual } from 'lodash';
import { Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import Task from '../Task';
import { column, task } from '../../types/tasks';
import classes from './Column.module.scss';

type ColumnType = {
  column: column;
  tasks: task[];
};

const Column: FC<ColumnType> = ({ column, tasks }) => (
    <div className={classes.column}>
      <h3 className={classes.title}>{column.title}</h3>
      <Droppable droppableId={column.id} type="TASK">
        {({ droppableProps, innerRef, placeholder }, snapshot) => (
          <div
            className={classNames(classes.taskList, {
              [classes.isDraggingOver] : snapshot.isDraggingOver,
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

export default memo(Column, isEqual);
