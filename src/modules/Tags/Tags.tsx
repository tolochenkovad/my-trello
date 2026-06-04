import { useEffect, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Input } from 'antd';
import classNames from 'classnames';
import { Icon } from '@/shared/ui';
import { useConfirmModal } from '@/shared/hooks';
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
    setEditableTags((prev) => ({ ...prev, [`tag-${newTagValue}-${tags.length}`]: { value: newTagValue } }));
  };

  const onSaveTag = () => {
    updateTags(editableTags);
  };

  const onEditTag = (e: ChangeEvent<HTMLInputElement>, tagId: string) => {
    setEditableTags((prev) => ({ ...prev, [tagId]: { value: e.target.value } }));
  };

  const onRemoveTag = (tagId: string) => {
    setEditableTags((prev) => ({ ...prev, [tagId]: { value: prev[tagId].value, isRemoved: true } }));
  };

  const onRevertDeletion = (tagId: string) => {
    setEditableTags((prev) => ({ ...prev, [tagId]: { value: prev[tagId].value, isRemoved: false } }));
  };

  useEffect(() => {
    if (!tags.length) {
      getTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newEditableTags = tags.reduce((acc, tag) => ({ ...acc, [tag.id]: { value: tag.label } }), {});
    setEditableTags(newEditableTags);
  }, [tags]);

  if (isLoadingTags) {
    return <AppSpinner />;
  }

  return (
    <>
      <div className={styles.container}>
        <Flex className={styles.createView} orientation="vertical" gap={10}>
          <div>
            <h5 className={styles.titleSection}>Create new tag</h5>
            <div className={styles.description}>Add a new tag to organize your tasks.</div>{' '}
          </div>

          <Flex gap={10}>
            <Input
              value={newTagValue}
              onChange={onChangeNewTagValue}
              className={classNames(styles.createTag, styles.input)}
              placeholder="Create a new tag..."
              allowClear
            />
            <Button type="primary" onClick={onAddTag} disabled={!newTagValue.trim().length} className={styles.button}>
              <Icon name="plus" />
              <span>Add tag</span>
            </Button>
          </Flex>
        </Flex>

        <div>
          <h5 className={styles.titleSection}>Current tags</h5>
          <div className={styles.description}>Edit or remove tags. Changes are locale until you save.</div>
        </div>

        <Flex orientation="vertical" gap={20}>
          <Flex vertical gap={8}>
            {Object.entries(editableTags).map(([tagId, tag]) => (
              <Flex key={tagId} gap={20} align="center">
                <Input
                  value={tag.value}
                  className={classNames({ [styles.isRemoved]: tag.isRemoved })}
                  onChange={(event) => onEditTag(event, tagId)}
                />

                {tag.isRemoved ? (
                  <Button onClick={() => onRevertDeletion(tagId)}>
                    <Icon name="undo" tooltip={{ title: 'Revert deletion' }} />
                  </Button>
                ) : (
                  <Button className={styles.removeIcon} onClick={() => onRemoveTag(tagId)}>
                    <Icon name="remove" tooltip={{ title: 'Remove Tag' }} />
                  </Button>
                )}
              </Flex>
            ))}
          </Flex>
          <Flex justify="space-between" className={styles.footer}>
            <Button onClick={openConfirmModal} className={styles.button}>
              <Icon name="moveLeft" />
              <span>Return to the main page</span>
            </Button>
            <Button type="primary" onClick={onSaveTag} className={styles.button}>
              <Icon name="save" />
              <span>Save changes</span>
            </Button>
          </Flex>
        </Flex>
      </div>
      {renderConfirmModal()}
    </>
  );
};
