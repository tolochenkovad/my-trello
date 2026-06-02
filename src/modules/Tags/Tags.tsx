import { useEffect, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Input } from 'antd';
import { Icon } from '@/shared/ui';
import { useConfirmModal } from '@/shared/hooks';
import classNames from 'classnames';
import { AppSpinner } from '@/shared/ui/Spinners';
import { useIsLoadingTags, useTagsData, useTasksActions } from '@/store/tasks/selectors';
import { EditableTags } from '@/store/tasks/types';
import { ROUTES } from '@/routes/constants';
import styles from './Tags.module.scss';

export const Tags = () => {
  const [newTagValue, setNewTagValue] = useState<string>('');
  const [editableTags, setEditableTags] = useState<EditableTags>({});
  const { getTags, updateTags } = useTasksActions();
  const tags = useTagsData();
  const isLoadingTags = useIsLoadingTags();
  const { push } = useHistory();

  const { renderConfirmModal, openConfirmModal } = useConfirmModal({
    confirmText: 'Are you sure you want to return to the main page? All unsaved changes will be lost.',
    onConfirmModal: () => push(ROUTES.MAIN),
  });

  const onChangeNewTagValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTagValue(e.target.value);
  };

  const onAddTag = () => {
    setNewTagValue('');
    setEditableTags((prev) => ({ ...prev, [`tag-${newTagValue}-${tags.length}`]: newTagValue }));
  };

  const onSaveTag = () => {
    updateTags(editableTags);
  };

  const onEditTag = (e: ChangeEvent<HTMLInputElement>, tagId: string) => {
    setEditableTags((prev) => ({ ...prev, [tagId]: e.target.value }));
  };

  const onRemoveTag = (tagId: string) => {
    setEditableTags((prev) => {
      const { [tagId]: _, ...rest } = prev;
      return rest;
    });
  };

  useEffect(() => {
    if (!tags.length) {
      getTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newEditableTags = tags.reduce((acc, tag) => ({ ...acc, [tag.id]: tag.label }), {});
    setEditableTags(newEditableTags);
  }, [tags]);

  if (isLoadingTags) {
    return <AppSpinner />;
  }

  return (
    <>
      <div className={styles.container}>
        <Flex className={styles.createView} orientation="vertical" gap={10}>
          <div className={styles.description}>
            <h5>Create new tag</h5>
            <div>Add a new tag to organize your tasks.</div>{' '}
          </div>

          <Flex gap={5}>
            <Input
              value={newTagValue}
              onChange={onChangeNewTagValue}
              className={classNames(styles.createTag, styles.input)}
              placeholder="Create a new tag..."
            />
            <Button type="primary" onClick={onAddTag} disabled={!newTagValue.trim().length}>
              Add tag
            </Button>
          </Flex>
        </Flex>

        <div className={styles.description}>
          <h5>Current tags</h5>
          <div>Edit or remove tags. Changes are locale until you save.</div>
        </div>

        <Flex orientation="vertical" gap={20}>
          <Flex vertical gap={8}>
            {Object.entries(editableTags).map(([tagId, tagValue]) => (
              <Flex key={tagId} gap={20} align="center">
                <Input value={tagValue} className={styles.input} onChange={(event) => onEditTag(event, tagId)} />
                <div className={styles.removeIcon} onClick={() => onRemoveTag(tagId)}>
                  <Icon name="remove" tooltip={{ title: 'Remove Tag' }} />
                </div>
              </Flex>
            ))}
          </Flex>
          <Flex justify="space-between">
            <Button onClick={openConfirmModal}> Return to the main page</Button>
            <Button type="primary" onClick={onSaveTag}>
              Save changes
            </Button>
          </Flex>
        </Flex>
      </div>
      {renderConfirmModal()}
    </>
  );
};
