import { FC, ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Calendar, { CalendarProps } from 'react-calendar';
import moment from 'moment';
import classNames from 'classnames';
import { showToast } from '@/helpers';
import Buttons from '../ButtonsForModal';
import classes from './TaskModal.module.scss';

type Props = {
  title: string;
  show: boolean;
  onHide: () => void;
  onConfirm: (value: string, dateOfTheEnd: string) => void;
  valueFromProps?: string;
  dateOfTheEndFromProps?: string;
  isTheEndOfTerm?: boolean;
};

const TaskModal: FC<Props> = ({
  title,
  show,
  onConfirm,
  onHide,
  valueFromProps,
  dateOfTheEndFromProps,
  isTheEndOfTerm,
}) => {
  const [value, setValue] = useState<string>(valueFromProps || '');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarData, setCalendarData] = useState<CalendarProps['value']>(
    dateOfTheEndFromProps ? new Date(dateOfTheEndFromProps) : null,
  );
  const [isEndOfTermValue, setEndOfTermValue] = useState(() => !!isTheEndOfTerm);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton className="no-border">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form onSubmit={onConfirmModal}>
            <input
              type="text"
              ref={inputRef}
              className={classes.input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>

          <div>
            <div className="mb-2">You can select an end date for this task</div>
            <Button variant="primary" className="small-btn" onClick={changeShowCalendarStatus}>
              {showCalendar ? 'Hide calendar' : 'Show calendar'}
            </Button>
            <Calendar
              value={calendarData}
              minDate={new Date()}
              onChange={onChangeCalendar}
              className={classNames(classes.calendar, {
                [classes.showCalendar]: showCalendar,
                [classes.hideCalendar]: !showCalendar,
              })}
            />
          </div>

          {calendarData && (
            <div className={classes.selectedDate}>
              <div>
                Date of the end of the task: <span>{moment(calendarData.toString(), 'Date').format('ll')}</span>
              </div>
              {isEndOfTermValue && (
                <span style={{ color: 'red' }}>In one day, the deadline for this task will end!</span>
              )}
              <div className="mt-3">
                <Button variant="primary" className="small-btn" onClick={() => setCalendarData(null)}>
                  Reset date of the end
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="no-border">
        <Buttons onHide={onHide} onConfirm={sendValue} />
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
