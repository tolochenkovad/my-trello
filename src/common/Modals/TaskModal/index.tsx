import React, { FC, ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Buttons from '../ButtonsForModal';
import ColorPicker from 'react-input-color';
import Calendar from 'react-calendar';
import moment from 'moment';
import classNames from 'classnames';
import { toastr } from 'react-redux-toastr';
import classes from './TaskModal.module.scss';

type Props = {
  title: string;
  show: boolean;
  onHide: () => void;
  onConfirm: (value: string, color: string, dateOfTheEnd: string) => void;
  valueFromProps?: string;
  colorFromProps?: string;
  dateOfTheEndFromProps?: string;
  isTheEndOfTerm?: boolean;
};

const TaskModal: FC<Props> = ({
  title,
  show,
  onConfirm,
  onHide,
  valueFromProps,
  colorFromProps,
  dateOfTheEndFromProps,
  isTheEndOfTerm,
}) => {
  const [value, setValue] = useState<string>(valueFromProps || '');
  const [color, setColor] = useState<string>(colorFromProps || '#cfcff2');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarData, setCalendarData] = useState<null | Date | Date[]>(
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
      toastr.error('You do not have a description of this task. Please, fill this field', '');
    } else {
      onConfirm(value.trim(), color, dateOfTheEnd);
      setValue('');
    }
  };

  const changeColor = ({ hex }: { hex: string }) => {
    setColor(hex);
  };

  const changeShowCalendarStatus = () => {
    setShowCalendar((prevState) => !prevState);
  };

  const onChangeCalendar = (value: Date | Date[]) => {
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
          <div className={classes.color}>
            <div className="mr-2">Choose background color of this task</div>
            <ColorPicker initialValue={color} onChange={changeColor} placement="right" />
          </div>

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
