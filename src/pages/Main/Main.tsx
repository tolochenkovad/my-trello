import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { initialDataType } from '../../types/tasks';
import { INITIAL_DATA } from '../../store/Tasks/reducer';
import { getTasks, saveDataToServer } from '../../store/Tasks/actions';
import Column from '../../components/Column';
import { useDispatch, useSelector } from 'react-redux';
import { getDataForDraggable } from '../../store/Tasks/selectors';

const Main: React.FC = () => {
  console.log('render Main')
  const [state, setState] = useState<initialDataType>(INITIAL_DATA);

  const dispatch = useDispatch();
  const dataForDraggable = useSelector(getDataForDraggable);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      dispatch(getTasks());
      isMounted.current = true;
    } else {
      setState(dataForDraggable);
    }
  }, [dispatch, dataForDraggable]);

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

      dispatch(saveDataToServer(newState));
    },
    [dispatch, state],
  );

  const renderDragContainer = useMemo(
    () => (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </DragDropContext>
    ),
    [onDragEnd, state],
  );

  return <>{renderDragContainer}</>;
};

export default Main;
