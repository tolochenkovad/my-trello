import { useCallback, useEffect, useRef, useState } from 'react';
import { Flex } from 'antd';
import { isEmpty } from 'lodash';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { INITIAL_DATA } from '@/entities/tasks/store/store';
import { InitialDataType } from '@/entities/tasks/types';
import AppSpinner from '@/shared/ui/Spinners/AppSpinner';
import {
  useIsLoadingTasks,
  useDataForDraggable,
  useTasksAsyncActions,
  useIsLoadingColumns,
} from '@/entities/tasks/store/selectors';
import { Column } from './components/Column';

export const Board = () => {
  const [state, setState] = useState<InitialDataType>(INITIAL_DATA);
  const isMounted = useRef(false);

  const dataForDraggable = useDataForDraggable();
  const isLoadingTasks = useIsLoadingTasks();
  const isLoadingColumns = useIsLoadingColumns();
  const { getTasks, getColumns, saveDataToServer } = useTasksAsyncActions();

  useEffect(() => {
    if (!isMounted.current) {
      getTasks();
      getColumns();
      isMounted.current = true;
    } else {
      setState(dataForDraggable);
    }
  }, [dataForDraggable, getTasks, getColumns]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
        return;
      }

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        };

        setState(newState);
        saveDataToServer({ data: newState, isReorder: true });
        return;
      }

      // Moving from one list to another
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
        tasks: {
          ...state.tasks,
          [draggableId]: {
            ...state.tasks[draggableId],
            columnId: newFinish.id,
          },
        },
      };
      setState(newState);

      saveDataToServer({ data: newState });
    },
    [state, saveDataToServer],
  );

  if ((isLoadingTasks || isLoadingColumns) && !isMounted.current) {
    return <AppSpinner />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex gap={16}>
        {!isEmpty(state.tasks) &&
          state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
      </Flex>
    </DragDropContext>
  );
};
