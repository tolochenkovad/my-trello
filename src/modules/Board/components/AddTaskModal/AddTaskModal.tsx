import { useEffect, useRef, useState } from 'react';
import { Input, SelectProps, DatePicker, Form } from 'antd';
import type { InputRef } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Modal, Select } from '@/shared/ui';
import { useTagsData } from '@/store/tasks/selectors';
import { Tag } from '@/store/tasks/types';
import { getTagsByIds } from '../../utils';
import { TaskDeadlineStatusUI } from '../../types';
import { TASK_DEADLINE_TRANSLATIONS } from '../../const';
import { getNormalizedTags } from './utils';
import styles from './AddTaskModal.module.scss';

const { TextArea } = Input;

type AddTaskModalProps = {
  title: string;
  show: boolean;
  onHide: () => void;
  onConfirm: (value: string, dateOfTheEnd: string, tags: Tag[]) => void;
  valueFromProps?: string;
  dateOfTheEndFromProps?: string;
  tagIds?: string[];
  taskDeadlineStatusFromProps?: TaskDeadlineStatusUI;
};

export const AddTaskModal = ({
  title,
  show,
  onConfirm,
  onHide,
  valueFromProps,
  dateOfTheEndFromProps,
  tagIds,
  taskDeadlineStatusFromProps,
}: AddTaskModalProps) => {
  const [calendarData, setCalendarData] = useState<Dayjs | null>(
    dateOfTheEndFromProps ? dayjs(dateOfTheEndFromProps) : null,
  );
  const allTags = useTagsData();
  const [currentTags, setCurrentTags] = useState<Tag[]>(tagIds ? getTagsByIds(allTags, tagIds) : []);
  const [taskDeadlineStatus, setTaskDeadlineStatus] = useState<TaskDeadlineStatusUI>(
    () => taskDeadlineStatusFromProps || null,
  );
  const [form] = Form.useForm();

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus({
        cursor: 'end',
      });
    });
  }, []);

  const onSave = async () => {
    const values = await form.validateFields();
    const dateOfTheEnd = calendarData ? calendarData?.format('YYYY-MM-DD') : '';
    onConfirm(values.description.trim(), dateOfTheEnd, currentTags);
    form.resetFields();
    setCurrentTags([]);
  };

  const handleChangeCalendar = (date: Dayjs | null) => {
    setCalendarData(date);
    setTaskDeadlineStatus(null);
  };

  const onChangeTag: SelectProps<Tag[]>['onChange'] = (data, options) => {
    const normalizedTags = getNormalizedTags(data, options as Tag[]);
    setCurrentTags(normalizedTags);
  };

  const disabledDate = (current: Dayjs) => {
    return current.isBefore(dayjs().startOf('day'));
  };

  return (
    <Modal open={show} onCancel={onHide} onOk={onSave} title={title} okText="Save">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          description: valueFromProps || '',
        }}
      >
        <Form.Item
          name="description"
          label="Description"
          className={styles.formItem}
          rules={[
            {
              required: true,
              message: "You don't have a description of this task. Please, fill this field",
            },
          ]}
        >
          <TextArea rows={4} ref={inputRef} className={styles.input} />
        </Form.Item>

        <Form.Item label="Deadline" className={styles.formItem}>
          <DatePicker disabledDate={disabledDate} onChange={handleChangeCalendar} value={calendarData} />
          {calendarData && taskDeadlineStatus && (
            <div className={styles.endOfTerm}>{TASK_DEADLINE_TRANSLATIONS[taskDeadlineStatus]}</div>
          )}
        </Form.Item>

        <Form.Item label="Tags" className={styles.formItem}>
          <Select
            labelInValue
            value={currentTags}
            mode="tags"
            style={{ width: '100%' }}
            placeholder="You can chose or create tag(s)"
            onChange={onChangeTag}
            options={allTags}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
