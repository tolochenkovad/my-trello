export type task = {
  id: string;
  content: string;
};

export type column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type initialDataType = {
  tasks: {
    [key: string]: task;
  };
  columns: {
    [key: string]: column;
  };
  columnOrder: string[];
};