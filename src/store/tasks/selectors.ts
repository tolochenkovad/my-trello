import { useShallow } from 'zustand/shallow';
import { forEach } from 'lodash';
import { createSelector } from 'reselect';
import { useTasksStore } from './store';
import { TasksAsyncActions, TasksStore } from './types';

export const useDataForDraggable = () => useTasksStore((state) => state.dataForDraggable);
export const useColumnsData = () => useTasksStore((state) => state.dataForDraggable.columns);
export const useTasksData = () => useTasksStore((state) => state.dataForDraggable.tasks);
export const useTagsData = () => useTasksStore((state) => state.dataForDraggable.tags);
export const useIsLoadingTasks = () => useTasksStore((state) => state.isLoadingTasks);
export const useIsLoadingColumns = () => useTasksStore((state) => state.isLoadingColumns);
export const useIsLoadingTags = () => useTasksStore((state) => state.isLoadingTags);

export const useTasksAsyncActions = () =>
  useTasksStore(
    useShallow(
      (state): TasksAsyncActions => ({
        getTasks: state.actions.getTasks,
        getColumns: state.actions.getColumns,
        addTask: state.actions.addTask,
        editTask: state.actions.editTask,
        saveDataToServer: state.actions.saveDataToServer,
        removeTask: state.actions.removeTask,
        getTags: state.actions.getTags
      }),
    ),
  );

export const selectQuantityItemsInCategories = createSelector(
  [(state: TasksStore) => state.dataForDraggable.columns],
  (columns) => {
    const data: [string, string | number][] = [['Task', 'Quantity']];
    forEach(columns, (columnItem) => {
      data.push([columnItem.title, columnItem.taskIds.length]);
    });
    return data;
  },
);

export const useQuantityItemsInCategories = () => useTasksStore(selectQuantityItemsInCategories);
