import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import { initialDataType } from '../../types/tasks';
import { INITIAL_DATA } from '../../store/Tasks/reducer';
import Column from '../../components/Column';
import { getDataForDraggable } from '../../store/Tasks/selectors';
import { getColumnsAction, getTasksAction, saveDataToServerAction } from '../../store/Tasks/actions';
import { useCheckStatus } from '../../hooks/useCheckStatus';
import Spinner from '../../common/Spinner';

const Main: FC = () => {
  const [state, setState] = useState<initialDataType>(INITIAL_DATA);

  const dispatch = useDispatch();
  const dataForDraggable = useSelector(getDataForDraggable);
  const isMounted = useRef(false);

  const { isLoading: isLoadingTasks } = useCheckStatus(getTasksAction.default.type);
  const { isLoading: isLoadingColumns } = useCheckStatus(getColumnsAction.default.type);

  useEffect(() => {
    if (!isMounted.current) {
      dispatch(getTasksAction.pending({}));
      dispatch(getColumnsAction.pending({}));
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

        console.log(newTaskIds, 'newTaskIds');

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
        console.log('reoder in the same column');

        setState(newState);
        dispatch(saveDataToServerAction.pending({ data: newState, isReorder: true }));
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
      console.log('move to the other column');
      setState(newState);

      dispatch(saveDataToServerAction.pending({ data: newState }));
    },
    [dispatch, state],
  );

  if (isLoadingColumns || isLoadingTasks) {
    return <Spinner />;
  }

  console.log(state, 'state');

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="d-flex">
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default Main;
