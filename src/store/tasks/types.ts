export const COLLECTIONS = {
  tasks: 'tasks',
  columns: 'columns',
  tags: 'tags',
};

export type TaskItem = {
  id: string;
  content: string;
  columnId: string;
  date: string;
  dateOfTheEnd: string;
  tagIds: string[];
};

export type ColumnItem = {
  id: string;
  title: string;
  taskIds: string[];
};

export type Tag = { id: string; value: string; label: string };

export type InitialDataType = {
  tasks: {
    [key: string]: TaskItem;
  };
  columns: {
    [key: string]: ColumnItem;
  };
  columnOrder: string[];
  tags: Tag[];
};

export interface AddTaskPayload {
  value: string;
  dateOfTheEnd: string;
  tags: Tag[];
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
  isLoadingTags: boolean;
};

type TasksStateActions = {
  setTasksData: (tasks: InitialDataType['tasks']) => void;
  setColumnsData: (columns: InitialDataType['columns']) => void;
  setTagsData: (tags: InitialDataType['tags']) => void;
  removeTaskData: (taskId: string) => void;
  saveDataLocally: (data: InitialDataType) => void;
  setError: (error: string | null) => void;
};

export type TasksAsyncActions = {
  getTasks: () => Promise<void>;
  getColumns: () => Promise<void>;
  getTags: () => Promise<void>;
  addTask: (payload: AddTaskPayload) => Promise<void>;
  editTask: (payload: EditTaskPayload) => Promise<void>;
  saveDataToServer: (payload: SaveDataToServerPayload) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
};

export type TasksActions = TasksStateActions & TasksAsyncActions;

export type TasksStore = TasksState & { actions: TasksActions };
