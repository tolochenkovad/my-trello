import { initialDataType } from '../../types/tasks';

export interface AddTaskPayload {
  value: string;
  color: string;
  dateOfTheEnd: string;
}

export interface EditTaskPayload extends AddTaskPayload {
  taskId: string;
}

export interface SaveDataToServerPayload {
  data: initialDataType;
  isReorder?: boolean;
}

type TasksState = {
  dataForDraggable: initialDataType;
  isLoadingTasks: boolean;
  isLoadingColumns: boolean;
  error: string | null;
};

type TasksStateActions = {
  setTasksData: (tasks: initialDataType['tasks']) => void;
  setColumnsData: (columns: initialDataType['columns']) => void;
  removeTaskData: (taskId: string) => void;
  saveDataLocally: (data: initialDataType) => void;
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
