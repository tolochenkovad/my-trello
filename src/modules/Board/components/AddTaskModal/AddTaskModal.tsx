import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import type { InputRef } from 'antd';
import Calendar, { CalendarProps } from 'react-calendar';
import moment from 'moment';
import classNames from 'classnames';
import { showToast } from '@/shared/utils';
import { Modal } from '@/shared/ui';
import styles from './AddTaskModal.module.scss';

const { TextArea } = Input;

type AddTaskModalProps = {
  title: string;
  show: boolean;
  onHide: () => void;
  onConfirm: (value: string, dateOfTheEnd: string) => void;
  valueFromProps?: string;
  dateOfTheEndFromProps?: string;
  isTheEndOfTerm?: boolean;
};

export const AddTaskModal = ({
  title,
  show,
  onConfirm,
  onHide,
  valueFromProps,
  dateOfTheEndFromProps,
  isTheEndOfTerm,
}: AddTaskModalProps) => {
  const [value, setValue] = useState<string>(valueFromProps || '');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarData, setCalendarData] = useState<CalendarProps['value']>(
    dateOfTheEndFromProps ? new Date(dateOfTheEndFromProps) : null,
  );
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
    sendValue();
  };

  const sendValue = () => {
    const dateOfTheEnd = calendarData ? calendarData.toString() : '';
    if (value.trim() === '') {
      showToast("You don't have a description of this task. Please, fill this field", 'error');
    } else {
      onConfirm(value.trim(), dateOfTheEnd);
      setValue('');
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
    setValue(e.target.value);
  };

  return (
    <Modal open={show} onCancel={onHide} onOk={sendValue} title={title}>
      <div>
        <form onSubmit={onConfirmModal}>
          <TextArea rows={4} ref={inputRef} className={styles.input} value={value} onChange={onChangeTextArea} />
        </form>

        <div>
          <div className="mb-2">You can select an end date for this task</div>
          <Button type="primary" className="small-btn" onClick={changeShowCalendarStatus}>
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
        </div>

        {calendarData && (
          <div className={styles.selectedDate}>
            <div>
              Date of the end of the task: <span>{moment(calendarData.toString(), 'Date').format('ll')}</span>
            </div>
            {isEndOfTermValue && <span style={{ color: 'red' }}>In one day, the deadline for this task will end!</span>}
            <div className="mt-3">
              <Button type="primary" className="small-btn" onClick={() => setCalendarData(null)}>
                Reset date of the end
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
