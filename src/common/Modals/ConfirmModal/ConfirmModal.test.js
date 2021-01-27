import React from 'react';
import { shallow } from 'enzyme';
import ConfirmModal from './ConfirmModal';

const props = {
  show: false,
  onHide: jest.fn(),
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(<ConfirmModal {...props} />);
});

describe('ConfirmModal', () => {
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('children is exist', () => {
    it('Modal', () => {
      expect(wrapper.find('Modal')).toHaveLength(1);
    });

    it('body', () => {
      expect(wrapper.find('ModalBody')).toHaveLength(1);
    });

    it('footer', () => {
      expect(wrapper.find('ModalFooter')).toHaveLength(1);
    });

    it('buttons', () => {
      expect(wrapper.find('Buttons')).toHaveLength(1);
    });
  });
});
