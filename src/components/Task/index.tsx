import React, { FC, useState, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { task } from '../../types/tasks';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import TaskModal from '../../common/Modals/TaskModal/TaskModal';
import ConfirmModal from '../../common/Modals/ConfirmModal/ConfirmModal';
import moment from 'moment';
import { editTaskAction, removeTaskAction } from '../../store/Tasks/actions';
import classes from './Task.module.scss';

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
    dispatch(editTaskAction.pending({ value, color, taskId: task.id, dateOfTheEnd }));
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
    dispatch(removeTaskAction.pending({ taskId: task.id }));
  };

  const isEndOfTermTask = useMemo(() => () => {
    const currentDate = new Date(task.date);
    const endDate = new Date(task.dateOfTheEnd);
    const difference = Math.ceil((endDate.getTime() - currentDate.getTime()) / (60 * 60 * 24 * 1000));
    return !!(endDate && difference === 1 && task.columnId !== 'column-3');
  }, [task.date, task.dateOfTheEnd, task.columnId]);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
          <div style={{ backgroundColor: task.color }}>
            <div
              className={classNames(classes.task, {
                [classes.isDragging]: snapshot.isDragging,
                [classes.endOfTerm]: isEndOfTermTask(),
              })}
              {...draggableProps}
              {...dragHandleProps}
              ref={innerRef}
            >
              <div className={classes.box}>
                <div className={classes.body}>
                  <div className={classes.content}>{task.content}</div>
                  <div className={classes.options}>
                    <div className={classes.icon}>
                      <PencilSquare onClick={() => setShowModal(true)} />
                    </div>
                    <div className={classes.icon}>
                      <Trash onClick={setConfirmModal} />
                    </div>
                  </div>
                </div>
                <div className={classes.date}>{moment(task.date).startOf('minutes').fromNow()}</div>
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
