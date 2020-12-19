import { AppStore } from '../../types';
import { forEach } from 'lodash';
import { createSelector } from 'reselect';

export const getDataForDraggable = (state: AppStore) => state.tasks.dataForDraggable;

const getColumnsData = (state: AppStore) => state.tasks.dataForDraggable.columns;

export const getQuantityItemsInCategories = createSelector(getColumnsData, (columns) => {
  const data = [['Task', 'Quantity']];
  forEach(columns, (columnItem) => {
    const quantityOfTasks = columnItem.taskIds.length;
    // @ts-ignore
    data.push([columnItem.title, quantityOfTasks]);
  });
  return data;
});
