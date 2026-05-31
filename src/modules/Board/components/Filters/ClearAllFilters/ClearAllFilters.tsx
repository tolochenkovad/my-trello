import { Flex } from 'antd';
import { Icon } from '@/shared/ui';
import { useTasksActions } from '@/store/tasks/selectors';
import styles from './ClearAllFilters.module.scss';

export const ClearAllFilters = () => {
  const { clearAllFilters } = useTasksActions();

  return (
    <Flex align="center" gap="5px" className={styles.clearAll} onClick={clearAllFilters}>
      <Icon name="remove" />
      <div>Clear All Filters</div>
    </Flex>
  );
};
