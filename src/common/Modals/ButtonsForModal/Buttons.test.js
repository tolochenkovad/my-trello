import React from 'react';
import { shallow } from 'enzyme';
import Buttons from './';

const props = {
  onConfirm: jest.fn(),
  onHide: jest.fn(),
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Buttons {...props} />);
});

describe('Buttons', () => {
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('children is exist', () => {
    it('Cancel button', () => {
      expect(wrapper.find('Button').at(0).text()).toEqual('Cancel');
    });

    it('Confirm button', () => {
      expect(wrapper.find('Button').at(1).text()).toEqual('Confirm');
    });
  });

  describe('buttons should call right func', () => {
    it('Cancel button should call onHide func', () => {
      wrapper.find('Button').at(0).simulate('click');
      expect(props.onHide).toHaveBeenCalled();
    });

    it('Confirm button should call onHide func', () => {
      wrapper.find('Button').at(1).simulate('click');
      expect(props.onConfirm).toHaveBeenCalled();
    });
  });
});
