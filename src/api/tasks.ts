import { initialData } from '../mock/mockData';
import { initialDataType } from '../types/tasks';

export function getTasks(): Promise<initialDataType> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(initialData), 1);
  });
}
