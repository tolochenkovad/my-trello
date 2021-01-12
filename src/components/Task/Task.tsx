import React, { FC, useState, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { task } from '../../types/tasks';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { editTask, removeTask } from '../../store/Tasks/actions';
import TaskModal from '../../common/Modals/TaskModal/TaskModal';
import ConfirmModal from '../../common/Modals/ConfirmModal/ConfirmModal';
import moment from 'moment';

type TaskType = {
  task: task;
  index: number;
};

const Task: FC<TaskType> = ({ task, index }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const editTaskContent = (value: string, color: string, dateOfTheEnd: string) => {
    setShowModal(false);
    dispatch(editTask(value, color, task.id, dateOfTheEnd));
  };

  const onConfirmModal = () => {
    setShowConfirmModal(false);
    onDeleteTask();
  };

  const onHideModal = () => {
    setShowConfirmModal(false);
  };

  const setConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const onDeleteTask = () => {
    dispatch(removeTask(task.id));
  };

  const isEndOfTermTask = useMemo(() => () => {
    const currentDate: any = new Date(task.date);
    const endDate: any = new Date(task.dateOfTheEnd);
    const difference = Math.ceil((endDate - currentDate) / (60 * 60 * 24 * 1000));
    return !!(endDate && difference === 1 && task.columnId !== 'column-3');
  }, [task.date, task.dateOfTheEnd, task.columnId]);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
          <div style={{ backgroundColor: task.color }}>
            <div
              className={classNames('task', {
                'task--isDragging': snapshot.isDragging,
                'task--endOfTerm': isEndOfTermTask(),
              })}
              {...draggableProps}
              {...dragHandleProps}
              ref={innerRef}
            >
              <div className="task__box">
                <div className="task__body">
                  <div className="content">{task.content}</div>
                  <div className="task__options">
                    <div className="icon">
                      <PencilSquare onClick={() => setShowModal(true)} />
                    </div>
                    <div className="icon">
                      <Trash onClick={setConfirmModal} />
                    </div>
                  </div>
                </div>
                <div className="task__date">{moment(task.date).startOf('minutes').fromNow()}</div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      {showModal && (
        <TaskModal
          title="Edit task"
          show
          onHide={() => setShowModal(false)}
          onConfirm={editTaskContent}
          valueFromProps={task.content}
          colorFromProps={task.color}
          dateOfTheEndFromProps={task.dateOfTheEnd}
          isTheEndOfTerm={isEndOfTermTask()}
        />
      )}

      {showConfirmModal && <ConfirmModal show onHide={onHideModal} onConfirm={onConfirmModal} />}
    </>
  );
};

export default React.memo(Task);
