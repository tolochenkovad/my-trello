import { useState, useMemo, memo } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import moment from 'moment';
import classNames from 'classnames';
import { TaskItem } from '@/store/tasks/types';
import { useTasksAsyncActions } from '@/store/tasks/selectors';
import { AddTaskModal } from '@/modules/Board/components/AddTaskModal';
import { Icon, Modal } from '@/shared/ui';
import styles from './Task.module.scss';

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
      className={styles.container}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={provided.draggableProps.style}
    >
      <div
        className={classNames(styles.task, {
          [styles.isDragging]: snapshot.isDragging,
          [styles.endOfTerm]: isEndOfTermTask(),
        })}
      >
        <div className={styles.box}>
          <div className={styles.body}>
            <div className={styles.content}>{task.content}</div>
            <div className={styles.actions}>
              <div className={styles.date}>{moment(task.date).startOf('minutes').fromNow()}</div>
              <div className={styles.options}>
                <div className={styles.icon}>
                  <Icon tooltip={{ title: 'Edit' }} name="edit" onClick={() => setShowModal(true)} size={16} />
                </div>
                <div className={styles.icon}>
                  <Icon tooltip={{ title: 'Delete' }} name="remove" onClick={setConfirmModal} size={16} />
                </div>
              </div>
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
