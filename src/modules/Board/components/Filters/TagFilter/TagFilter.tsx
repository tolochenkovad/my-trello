import { Flex } from 'antd';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useActiveTagIds, useTagsData, useTasksActions } from '@/store/tasks/selectors';
import { Icon } from '@/shared/ui';
import { ROUTES } from '@/routes/constants';
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
      <Flex className={styles.tags} align="center" gap={5}>
        <NavLink to={ROUTES.TAGS} className={styles.editTagsIcon}>
          <Icon tooltip={{ title: 'Edit Tags' }} name="edit" />
        </NavLink>

        <div className={styles.title}>Tags:</div>
      </Flex>
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
