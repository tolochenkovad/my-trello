import { InitialDataType } from '@/entities/tasks/types';

export const COLLECTIONS = {
  tasks: 'tasks',
  columns: 'columns',
};


export interface AddTaskPayload {
  value: string;
  dateOfTheEnd: string;
}

export interface EditTaskPayload extends AddTaskPayload {
  taskId: string;
}

export interface SaveDataToServerPayload {
  data: InitialDataType;
  isReorder?: boolean;
}

type TasksState = {
  dataForDraggable: InitialDataType;
  isLoadingTasks: boolean;
  isLoadingColumns: boolean;
  error: string | null;
};

type TasksStateActions = {
  setTasksData: (tasks: InitialDataType['tasks']) => void;
  setColumnsData: (columns: InitialDataType['columns']) => void;
  removeTaskData: (taskId: string) => void;
  saveDataLocally: (data: InitialDataType) => void;
  setError: (error: string | null) => void;
};

export type TasksAsyncActions = {
  getTasks: () => Promise<void>;
  getColumns: () => Promise<void>;
  addTask: (payload: AddTaskPayload) => Promise<void>;
  editTask: (payload: EditTaskPayload) => Promise<void>;
  saveDataToServer: (payload: SaveDataToServerPayload) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
};

export type TasksActions = TasksStateActions & TasksAsyncActions;

export type TasksStore = TasksState & { actions: TasksActions };
