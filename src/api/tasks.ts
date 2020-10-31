import initialData from '../components/initial-data';
import { initialDataType } from '../types/tasks';

export function getTasks(): Promise<initialDataType> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(initialData), 2000);
  });
}
