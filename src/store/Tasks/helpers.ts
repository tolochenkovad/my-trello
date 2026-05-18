import { last, size, forEach, get } from 'lodash';
import { getAuth } from 'firebase/auth';
import { InitialDataType } from '@/types/tasks';

function sortTasksIds(a: string, b: string): number {
  if (a.includes('-') && b.includes('-')) {
    const leftElement = last(a.split('-'));
    const rightElement = last(b.split('-'));
    if (leftElement && rightElement) {
      return +leftElement - +rightElement;
    }
  }
  return -1;
}

export function getIndexForNewTask(tasks: InitialDataType['tasks']): number {
  const lastKey = size(tasks) > 0 && last(Object.keys(tasks).sort(sortTasksIds));
  const lastIndex = lastKey ? last(lastKey.split('-')) : 0;
  return lastIndex ? +lastIndex + 1 : 1;
}

export function getAuthUserId(): string | undefined  {
  const auth = getAuth();
  return get(auth, 'currentUser.uid');
};

export function fillColumnsWithTasks(
  columns: InitialDataType['columns'],
  tasks: InitialDataType['tasks'],
): InitialDataType['columns'] {
  const updatedColumns = { ...columns };

  forEach(updatedColumns, (columnItem) => {
    forEach(tasks, (taskItem) => {
      if (taskItem.columnId === columnItem.id && !columnItem.taskIds.includes(taskItem.id)) {
        columnItem.taskIds.push(taskItem.id);
      }
    });
  });

  return updatedColumns;
}

export function removeTaskFromColumn(
  columns: InitialDataType['columns'],
  tasks: InitialDataType['tasks'],
  taskId: string,
): InitialDataType['columns'] {
  const task = tasks[taskId];
  if (!task) return columns;

  const column = columns[task.columnId];
  if (!column) return columns;

  return {
    ...columns,
    [task.columnId]: {
      ...column,
      taskIds: column.taskIds.filter((id) => id !== taskId),
    },
  };
}