import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { initialDataType } from '../../types/tasks';
import { INITIAL_DATA } from '../../store/Tasks/reducer';
import { getTasks } from '../../store/Tasks/actions';
import Column from '../../components/Column';
import { AppStore } from '../../types';
import { useDispatch, useSelector } from 'react-redux';

const Main: React.FC = () => {
  const [state, setState] = useState<initialDataType>(INITIAL_DATA);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector((state: AppStore) => state.tasks.dataForDraggable);

  useEffect(() => {
    if (tasks.columnOrder.length > 0) {
      setState(tasks);
    } else {
      dispatch(getTasks());
    }
  }, [dispatch, tasks]);

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
      };
      setState(newState);
    },
    [state],
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

  console.log('render');
  return (
    <>
      {renderDragContainer}
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    </>
  );
};

export default Main;
