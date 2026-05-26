import { useCallback, useEffect, useState } from 'react';
import { Flex, Typography } from 'antd';
import { isEmpty } from 'lodash';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { INITIAL_DATA } from '@/store/tasks/store';
import { InitialDataType } from '@/store/tasks/types';
import { AppSpinner, Icon } from '@/shared/ui';
import { useDataForDraggable, useTasksAsyncActions, useIsInitialLoading } from '@/store/tasks/selectors';
import { Column, CreateTask } from './components';
import styles from './Board.module.scss';

export const Board = () => {
  const dataForDraggable = useDataForDraggable();
  const [state, setState] = useState<InitialDataType>(INITIAL_DATA);
  const isInitialLoading = useIsInitialLoading();
  const { saveDataToServer, getAllData } = useTasksAsyncActions();

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState(dataForDraggable);
  }, [dataForDraggable]);

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

  if (isInitialLoading) {
    return <AppSpinner />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isEmpty(state.tasks) && !isInitialLoading ? (
        <Flex vertical align="center" justify="center" className={styles.emptyStateWrapper}>
          <Icon name="clipboardList" size={48} />
          <Typography.Title level={2} className={styles.emptyStateTitle}>
            Create your first task and start organizing your workflow and track progress visually
          </Typography.Title>
          <CreateTask className={styles.createBtn} />
        </Flex>
      ) : (
        <Flex gap={16}>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Flex>
      )}
    </DragDropContext>
  );
};
