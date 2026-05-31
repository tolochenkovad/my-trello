import { ChangeEvent } from 'react';
import { Icon } from '@/shared/ui';
import { Input } from 'antd';
import { useSearchValue, useTasksActions } from '@/store/tasks/selectors';
import styles from './Search.module.scss';

export const Search = () => {
  const { searchTasks } = useTasksActions();
  const searchValue = useSearchValue();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchTasks(e.target.value.trim());
  };

  return (
    <Input
      placeholder="Search tasks..."
      value={searchValue}
      allowClear
      onChange={onChange}
      className={styles.search}
      prefix={<Icon name="search" className={styles.searchIcon} />}
    />
  );
};
