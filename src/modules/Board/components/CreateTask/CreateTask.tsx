import { useState } from 'react';
import { Button, ButtonProps } from 'antd';
import { useTasksActions } from '@/store/tasks/selectors';
import { Tag } from '@/store/tasks/types';
import { AddTaskModal } from '../AddTaskModal';

export const CreateTask = ({ ...rest }: ButtonProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { addTask } = useTasksActions();

  const addTaskToBase = (value: string, dateOfTheEnd: string, tags: Tag[]) => {
    addTask({ value, dateOfTheEnd, tags });
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button type="primary" onClick={openModal} {...rest}>
        Create task
      </Button>
      {showModal && <AddTaskModal title="Create task" show onHide={closeModal} onConfirm={addTaskToBase} />}
    </>
  );
};
