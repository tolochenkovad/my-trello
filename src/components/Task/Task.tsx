import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { task } from '../../types/tasks';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { editTask, removeTask } from '../../store/Tasks/actions';
import TaskModal from '../../common/Modals/TaskModal';
import ConfirmModal from '../../common/Modals/ConfirmModal';

type TaskType = {
  task: task;
  index: number;
};

const Task: React.FC<TaskType> = ({ task, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();

  const editTaskContent = (value) => {
    setShowModal(false);
    dispatch(editTask(value, task.id));
  };

  const onConfirmModal = () => {
    setShowConfirmModal(false);
    onDeleteTask();
  };

  const setConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const onDeleteTask = () => {
    dispatch(removeTask(task.id));
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
          <div
            className={classNames('task', {
              'task--isDragging': snapshot.isDragging,
            })}
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
          >
            <div className="task__body">
              <div>{task.content}</div>
              <div className="task__options">
                <div className="icon">
                  <PencilSquare onClick={() => setShowModal(true)} />
                </div>
                <div className="icon">
                  <Trash onClick={setConfirmModal} />
                </div>
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
        />
      )}

      {showConfirmModal && <ConfirmModal show onHide={onConfirmModal} />}
    </>
  );
};

export default React.memo(Task);
