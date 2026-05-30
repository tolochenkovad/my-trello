import { memo } from 'react';
import { isEqual } from 'lodash';
import { Droppable } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { ColumnItem, TaskItem } from '@/store/tasks/types';
import { Task } from '../Task';
import styles from './Column.module.scss';

type ColumnProps = {
  column: ColumnItem;
  tasks: TaskItem[];
  isDragDisabled: boolean;
};

const ColumnComponent = ({ column, tasks, isDragDisabled }: ColumnProps) => (
  <div className={styles.column}>
    <div className={styles.columnHeader}>
      <h3>{column.title}</h3>
      <span className={styles.taskCount}>{tasks.length}</span>
    </div>

    <Droppable
      droppableId={column.id}
      type="TASK"
      renderClone={(provided, snapshot, rubric) => {
        const task = tasks[rubric.source.index];

        return (
          <Task
            task={task}
            index={rubric.source.index}
            provided={provided}
            snapshot={snapshot}
            isClone
            isDragDisabled={isDragDisabled}
          />
        );
      }}
    >
      {({ droppableProps, innerRef, placeholder }, snapshot) => (
        <div
          className={classNames(styles.taskList, {
            [styles.isDraggingOver]: snapshot.isDraggingOver,
          })}
          ref={innerRef}
          {...droppableProps}
        >
          {tasks.map((task, index) =>
            task ? <Task key={task.id} task={task} index={index} isDragDisabled={isDragDisabled} /> : null,
          )}
          {placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export const Column = memo(ColumnComponent, isEqual);
