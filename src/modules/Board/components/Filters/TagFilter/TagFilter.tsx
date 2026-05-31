import { Flex } from 'antd';
import classNames from 'classnames';
import { useActiveTagIds, useTagsData, useTasksActions } from '@/store/tasks/selectors';
import { Icon } from '@/shared/ui';
import styles from './TagFilter.module.scss';

export const TagFilter = () => {
  const tags = useTagsData();
  const activeTagIds = useActiveTagIds();
  const { addActiveTag, removeActiveTag } = useTasksActions();

  const onClickTag = (id: string) => {
    if (activeTagIds.includes(id)) {
      removeActiveTag(id);
    } else {
      addActiveTag(id);
    }
  };

  return (
    <Flex align="center" className={styles.container}>
      <div className={styles.title}>Tags:</div>
      <ul className={styles.tagslist}>
        {tags.map(({ label, id }) => (
          <li
            key={id}
            className={classNames({
              [styles.activeTag]: activeTagIds.includes(id),
            })}
            onClick={() => onClickTag(id)}
          >
            <span>{label}</span>
            {activeTagIds.includes(id) && <Icon name="cross" size={12} />}
          </li>
        ))}
      </ul>
    </Flex>
  );
};
