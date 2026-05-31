import { ComponentType } from 'react';
import { Button, Flex } from 'antd';
import { noop } from 'lodash';
import { useConfirmModal } from '@/shared/hooks';
import { useTasksActions } from '@/store/tasks/selectors';
import styles from './ModalButtons.module.scss';

type ModalButtonsProps = {
  OkBtn: ComponentType;
  CancelBtn: ComponentType;
  taskId?: string;
};

export const ModalButtons = ({ taskId, OkBtn, CancelBtn }: ModalButtonsProps) => {
  const { removeTask } = useTasksActions();

  const { renderConfirmModal, openConfirmModal } = useConfirmModal({
    confirmText: 'Are you sure you want to delete this task?',
    onConfirmModal: () => (taskId ? removeTask(taskId) : noop),
  });

  return (
    <>
      <Flex>
        {taskId && (
          <Button className={styles.remove} onClick={openConfirmModal}>
            Remove
          </Button>
        )}
        <Flex gap={10} className={styles.modalButtons}>
          <CancelBtn />
          <OkBtn />
        </Flex>
      </Flex>
      {renderConfirmModal()}
    </>
  );
};
