import { AppStore } from '../../types';
import { forEach } from 'lodash';
import { createSelector } from 'reselect';

export const getDataForDraggable = (state: AppStore) => state.tasks.dataForDraggable;

const getColumnsData = (state: AppStore) => state.tasks.dataForDraggable.columns;

type DataType = [string, number | string];

export const getQuantityItemsInCategories = createSelector(getColumnsData, (columns) => {
  const data = [['Task', 'Quantity']] as DataType[];
  forEach(columns, (columnItem) => {
    const quantityOfTasks = columnItem.taskIds.length;
    data.push([columnItem.title, quantityOfTasks]);
  });
  return data;
});
