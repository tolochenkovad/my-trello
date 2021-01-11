export type task = {
  id: string;
  content: string;
  columnId : string,
  date: string,
  dateOfTheEnd: string,
  color: string,
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
