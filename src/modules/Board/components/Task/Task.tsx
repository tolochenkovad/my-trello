import { useState, useMemo, memo } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import moment from 'moment';
import classNames from 'classnames';
import { Tag, TaskItem } from '@/store/tasks/types';
import { useTagsData, useTasksActions } from '@/store/tasks/selectors';
import { AddTaskModal } from '@/modules/Board/components/AddTaskModal';
import { Icon, Modal } from '@/shared/ui';
import { getDeadlineTaskStatus, getTagsByIds } from '../../utils';
import { TaskDeadlineStatusUI } from '../../types';
import { TASK_DEADLINE_TRANSLATIONS } from '../../const';
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
  const { editTask, removeTask } = useTasksActions();
  const allTags = useTagsData();
  const currentTags = useMemo<Tag[]>(() => {
    if (task.tagIds?.length) {
      return getTagsByIds(allTags, task.tagIds);
    }
    return [];
  }, [task, allTags]);

  const editTaskContent = (value: string, dateOfTheEnd: string, tags: Tag[]) => {
    setShowModal(false);
    editTask({ value, taskId: task.id, dateOfTheEnd, tags });
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

  const taskDeadlineStatus = useMemo<TaskDeadlineStatusUI>(() => {
    if (task.columnId === 'column-3') {
      return null;
    }
    return getDeadlineTaskStatus(task.dateOfTheEnd);
  }, [task.dateOfTheEnd, task.columnId]);

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
        })}
      >
        <div className={styles.box}>
          <div className={styles.body}>
            <div className={styles.content}>{task.content}</div>
            <div className={styles.actions}>
              <div className={styles.date}>{moment(task.date).startOf('minutes').fromNow()}</div>
              <div className={styles.options}>
                {taskDeadlineStatus && (
                  <div className={styles.icon}>
                    <Icon
                      className={styles.deadlineIcon}
                      tooltip={{ title: TASK_DEADLINE_TRANSLATIONS[taskDeadlineStatus] }}
                      name="warning"
                    />
                  </div>
                )}

                <div className={styles.icon}>
                  <Icon tooltip={{ title: 'Edit' }} name="edit" onClick={() => setShowModal(true)} />
                </div>
                <div className={styles.icon}>
                  <Icon tooltip={{ title: 'Delete' }} name="remove" onClick={setConfirmModal} />
                </div>
              </div>
            </div>

            <ul className={styles.tags}>
              {currentTags.length ? currentTags.map(({ id, label }) => <li key={id}>{label}</li>) : null}
            </ul>
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
          taskDeadlineStatusFromProps={taskDeadlineStatus}
          tagIds={task.tagIds}
        />
      )}

      <Modal open={showConfirmModal} onCancel={onHideModal} onOk={onConfirmModal}>
        <div className="text-center">Are you sure you want to delete this task?</div>
      </Modal>
    </>
  );
};

export const Task = memo(TaskComponent);
