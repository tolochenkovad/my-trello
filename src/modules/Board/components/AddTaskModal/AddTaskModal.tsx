import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Input, SelectProps } from 'antd';
import type { InputRef } from 'antd';
import Calendar, { CalendarProps } from 'react-calendar';
import moment from 'moment';
import classNames from 'classnames';
import { showToast } from '@/shared/utils';
import { Modal, Select } from '@/shared/ui';
import { useTagsData } from '@/store/tasks/selectors';
import { Tag } from '@/store/tasks/types';
import { getTagsByIds } from '../../utils';
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
  isTheEndOfTerm?: boolean;
};

export const AddTaskModal = ({
  title,
  show,
  onConfirm,
  onHide,
  valueFromProps,
  dateOfTheEndFromProps,
  tagIds,
  isTheEndOfTerm,
}: AddTaskModalProps) => {
  const [taskValue, setTaskValue] = useState<string>(valueFromProps || '');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarData, setCalendarData] = useState<CalendarProps['value']>(
    dateOfTheEndFromProps ? new Date(dateOfTheEndFromProps) : null,
  );
  const allTags = useTagsData();
  const [currentTags, setCurrentTags] = useState<Tag[]>(tagIds ? getTagsByIds(allTags, tagIds) : []);
  const [isEndOfTermValue, setEndOfTermValue] = useState(() => !!isTheEndOfTerm);

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus({
        cursor: 'end',
      });
    });
  }, []);

  const onConfirmModal = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

  const onSave = () => {
    const dateOfTheEnd = calendarData ? calendarData.toString() : '';
    if (taskValue.trim() === '') {
      showToast("You don't have a description of this task. Please, fill this field", 'error');
    } else {
      onConfirm(taskValue.trim(), dateOfTheEnd, currentTags);
      setTaskValue('');
      setCurrentTags([]);
    }
  };

  const changeShowCalendarStatus = () => {
    setShowCalendar((prevState) => !prevState);
  };

  const onChangeCalendar = (value: CalendarProps['value']) => {
    setCalendarData(value);
    setEndOfTermValue(false);
  };

  const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskValue(e.target.value);
  };

  const onChangeTag: SelectProps<Tag[]>['onChange'] = (data, options) => {
    const normalizedTags = getNormalizedTags(data, options as Tag[]);
    setCurrentTags(normalizedTags);
  };

  const onReset = () => {
    setCalendarData(null);
  };

  return (
    <Modal open={show} onCancel={onHide} onOk={onSave} title={title}>
      <div>
        <form onSubmit={onConfirmModal}>
          <TextArea rows={4} ref={inputRef} className={styles.input} value={taskValue} onChange={onChangeTextArea} />
        </form>

        <div>
          <div className="mb-2">You can select an end date for this task</div>
          <Button type="primary" onClick={changeShowCalendarStatus}>
            {showCalendar ? 'Hide calendar' : 'Show calendar'}
          </Button>
          <Calendar
            value={calendarData}
            minDate={new Date()}
            onChange={onChangeCalendar}
            className={classNames(styles.calendar, {
              [styles.showCalendar]: showCalendar,
              [styles.hideCalendar]: !showCalendar,
            })}
          />
          <Select
            labelInValue
            value={currentTags}
            mode="tags"
            style={{ width: '100%' }}
            placeholder="You can chose or create tag(s)"
            onChange={onChangeTag}
            options={allTags}
            className={styles.select}
          />
        </div>

        {calendarData && (
          <div className={styles.selectedDate}>
            <div>
              Date of the end of the task: <span>{moment(calendarData.toString(), 'Date').format('ll')}</span>
            </div>
            {isEndOfTermValue && <span style={{ color: 'red' }}>In one day, the deadline for this task will end!</span>}
            <div className="mt-3">
              <Button type="primary" onClick={onReset}>
                Reset date of the end
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
