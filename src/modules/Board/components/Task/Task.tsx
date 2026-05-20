import { useState, useMemo, memo } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import moment from 'moment';
import classNames from 'classnames';
import { SquarePen, Trash2 } from 'lucide-react';
import { useTasksAsyncActions } from '@/entities/tasks/store/selectors';
import { TaskItem } from '@/entities/tasks/types';
import { AddTaskModal } from '@/modules/Board/components/AddTaskModal';
import Modal from '@/shared/ui/Modal';
import classes from './Task.module.scss';

type TaskProps = {
  task: TaskItem;
  index: number;
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  isClone?: boolean;
};

const TaskComponent = ({
  task,
  index,
  provided: externalProvided,
  snapshot: externalSnapshot,
  isClone = false,
}: TaskProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const { editTask, removeTask } = useTasksAsyncActions();

  const editTaskContent = (value: string, dateOfTheEnd: string) => {
    setShowModal(false);
    editTask({ value, taskId: task.id, dateOfTheEnd });
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
    removeTask(task.id);
  };

  const isEndOfTermTask = useMemo(
    () => () => {
      const currentDate = new Date(task.date);
      const endDate = new Date(task.dateOfTheEnd);
      const difference = Math.ceil((endDate.getTime() - currentDate.getTime()) / (60 * 60 * 24 * 1000));
      return !!(endDate && difference === 1 && task.columnId !== 'column-3');
    },
    [task.date, task.dateOfTheEnd, task.columnId],
  );

  const renderContent = (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
    <div
      className={classes.container}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={provided.draggableProps.style}
    >
      <div
        className={classNames(classes.task, {
          [classes.isDragging]: snapshot.isDragging,
          [classes.endOfTerm]: isEndOfTermTask(),
        })}
      >
        <div className={classes.box}>
          <div className={classes.body}>
            <div className={classes.content}>{task.content}</div>
            <div className={classes.actions}>
              <div className={classes.options}>
                <div className={classes.icon}>
                  <SquarePen onClick={() => setShowModal(true)} size={16} />
                </div>
                <div className={classes.icon}>
                  <Trash2 onClick={setConfirmModal} size={16} />
                </div>
              </div>
              <div className={classes.date}>{moment(task.date).startOf('minutes').fromNow()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isClone && externalProvided && externalSnapshot) {
    return renderContent(externalProvided, externalSnapshot);
  }

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => renderContent(provided, snapshot)}
      </Draggable>
      {showModal && (
        <AddTaskModal
          title="Edit task"
          show
          onHide={() => setShowModal(false)}
          onConfirm={editTaskContent}
          valueFromProps={task.content}
          dateOfTheEndFromProps={task.dateOfTheEnd}
          isTheEndOfTerm={isEndOfTermTask()}
        />
      )}

      <Modal open={showConfirmModal} onCancel={onHideModal} onOk={onConfirmModal}>
        <div className="text-center">Are you sure you want to delete this task?</div>
      </Modal>
    </>
  );
};

export const Task = memo(TaskComponent);
