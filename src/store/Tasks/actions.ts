import actionBuilder from '../../helpers/actionBuilder';
import { initialDataType } from '../../types/tasks';

interface BaseTaskStructure {
  value: string;
  color: string;
  dateOfTheEnd: string;
}

interface IGetTasksAction {
  fulfilled: { tasks: initialDataType['tasks'] };
}

export const getTasksAction = actionBuilder<IGetTasksAction>('tasks/get');

interface IGetColumnsAction {
  fulfilled: { columns: initialDataType['columns'] };
}

export const getColumnsAction = actionBuilder<IGetColumnsAction>('columns/get');

interface IAddTaskAction {
  pending: BaseTaskStructure;
}
export const addTaskAction = actionBuilder<IAddTaskAction>('tasks/add');

interface IEditTaskAction {
  pending: BaseTaskStructure & { taskId: string };
}
export const editTaskAction = actionBuilder<IEditTaskAction>('tasks/edit');

interface ISaveDataToServerAction {
  pending: { data: initialDataType; isReorder?: boolean };
  fulfilled: { data: initialDataType };
}
export const saveDataToServerAction = actionBuilder<ISaveDataToServerAction>('data/save');

interface IRemoveTaskAction {
  pending: {
    taskId: string;
  };
  fulfilled: { taskId: string };
}
export const removeTaskAction = actionBuilder<IRemoveTaskAction>('tasks/remove');