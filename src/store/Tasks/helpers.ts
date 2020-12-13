import { last, size } from 'lodash';
import { initialDataType } from '../../types/tasks';

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

export function getIndexForNewTask(tasks: initialDataType['tasks']): number {
  const lastKey = size(tasks) > 0 && last(Object.keys(tasks).sort(sortTasksIds));
  const lastIndex = lastKey ? last(lastKey.split('-')) : 0;
  return lastIndex ? +lastIndex + 1 : 1;
}
