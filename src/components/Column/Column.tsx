import { FC, memo } from 'react';
import { isEqual } from 'lodash';
import { Droppable } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { ColumnItem, TaskItem } from '@/types/tasks';
import Task from '../Task';
import styles from './Column.module.scss';


type ColumnType = {
  column: ColumnItem;
  tasks: TaskItem[];
};

const Column: FC<ColumnType> = ({ column, tasks }) => (
  <div className={styles.column}>
    <div className={styles.columnTitle}>
      <h3>{column.title}</h3>
      <span>{tasks.length}</span>
    </div>
    <Droppable droppableId={column.id} type="TASK">
      {({ droppableProps, innerRef, placeholder }, snapshot) => (
        <div
          className={classNames(styles.taskList, {
            [styles.isDraggingOver]: snapshot.isDraggingOver,
          })}
          ref={innerRef}
          {...droppableProps}
        >
          {tasks.map((task, index) => (task ? <Task key={task.id} task={task} index={index} /> : null))}
          {placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default memo(Column, isEqual);
