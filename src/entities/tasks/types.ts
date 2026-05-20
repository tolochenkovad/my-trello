export type TaskItem = {
  id: string;
  content: string;
  columnId: string;
  date: string;
  dateOfTheEnd: string;
};

export type ColumnItem = {
  id: string;
  title: string;
  taskIds: string[];
};

export type InitialDataType = {
  tasks: {
    [key: string]: TaskItem;
  };
  columns: {
    [key: string]: ColumnItem;
  };
  columnOrder: string[];
};