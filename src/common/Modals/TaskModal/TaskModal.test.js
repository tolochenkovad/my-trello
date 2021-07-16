import React from 'react';
import { shallow, mount } from 'enzyme';
import TaskModal from './';
import { act } from 'react-dom/test-utils';
import { toastr } from 'react-redux-toastr';

const props = {
  title: 'Edit task',
  show: true,
  onHide: jest.fn(),
  onConfirm: jest.fn(),
  valueFromProps: 'Test',
};

const INITIAL_VALUES = {
  COLOR: '#cfcff2',
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(<TaskModal {...props} />);
});

describe('TaskModal', () => {
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  describe('children is exist', () => {
    it('ModalHeader', () => {
      expect(wrapper.find('ModalHeader')).toHaveLength(1);
    });

    describe('ModalBody', () => {
      it('ModalBody', () => {
        expect(wrapper.find('ModalBody')).toHaveLength(1);
      });

      it('description field should exist', () => {
        expect(wrapper.find('.input')).toHaveLength(1);
      });

      it('ColorPicker should exist', () => {
        expect(wrapper.find('InputColor')).toHaveLength(1);
      });

      it('Calendar button should exist', () => {
        expect(wrapper.find('Button').at(0).text()).toEqual('Show calendar');
      });

      it('Calendar should exist', () => {
        expect(wrapper.find('Calendar')).toHaveLength(1);
      });
    });

    describe('ModalFooter', () => {
      it('ModalFooter', () => {
        expect(wrapper.find('ModalFooter')).toHaveLength(1);
      });

      it('Buttons', () => {
        expect(wrapper.find('Buttons')).toHaveLength(1);
      });
    });
  });

  describe('should works correctly', () => {
    let wrapperMount;
    let confirmButton;
    beforeEach(() => {
      wrapperMount = mount(<TaskModal {...props} />);
      confirmButton = wrapperMount.find('Buttons').find('Button').at(1);
    });

    it('field for description', () => {
      const inputField = wrapperMount.find('.input');
      const event = { target: { value: 'Test second' } };
      expect(inputField.text()).toEqual('');
      inputField.simulate('change', event);
      confirmButton.simulate('click');
      expect(props.onConfirm).toHaveBeenCalledWith(event.target.value, INITIAL_VALUES.COLOR, '');
    });

    it('colorPicker', () => {
      const inputField = wrapperMount.find('InputColor');
      expect(inputField.props().initialValue).toEqual(INITIAL_VALUES.COLOR);
      act(() => {
        inputField.props().onChange({ hex: '#343457' });
      });
      confirmButton.simulate('click');
      expect(props.onConfirm).toHaveBeenCalledWith(props.valueFromProps, '#343457', '');
    });

    it('calendar', () => {
      const calendar = wrapperMount.find('Calendar');
      const currentDate = new Date('2021-12-17T03:24:00');
      expect(calendar.props().value).toEqual(null);
      act(() => {
        calendar.props().onChange(currentDate);
      });
      confirmButton.simulate('click');
      expect(props.onConfirm).toHaveBeenCalledWith(props.valueFromProps, INITIAL_VALUES.COLOR, currentDate.toString());
    });

    it('calendar button', () => {
      expect(wrapper.find('Calendar').props().className).toContain('hideCalendar');
      wrapper.find('Button').at(0).simulate('click');
      expect(wrapper.find('Calendar').props().className).not.toContain('hideCalendar');
    });

    it('should display warning if description is empty', () => {
      jest.spyOn(toastr, 'error');
      const inputField = wrapperMount.find('.input');
      const event = { target: { value: '' } };
      expect(inputField.text()).toEqual('');
      inputField.simulate('change', event);
      confirmButton.simulate('click');
      expect(toastr.error).toHaveBeenCalled();
    });
  });
});
