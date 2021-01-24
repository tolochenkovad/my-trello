import React from 'react';
import { mount, shallow } from 'enzyme';
import { size } from 'lodash';
import Main from './Main';
import { useSelector, useDispatch } from 'react-redux';
import { INITIAL_DATA } from '../../store/Tasks/reducer';


let wrapper;

useSelector.mockImplementation(() => INITIAL_DATA);

describe('Main', () => {
  describe('shallow', () => {
    beforeEach(() => {
      wrapper = shallow(<Main />);
    });
    it('should render', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('children is exist', () => {
      it('DragDropContext', () => {
        expect(wrapper.find('DragDropContext')).toHaveLength(1);
      });

      it('Column', () => {
        expect(wrapper.find('Memo(Column)')).toHaveLength(size(INITIAL_DATA.columnOrder));
      });
    });
  });

  describe('should works correctly', () => {
    it('should call getTasks if component is mounted', () => {
      const getTasks = jest.fn();
      useDispatch.mockImplementation(() => getTasks);
      wrapper = mount(<Main />);
      expect(getTasks).toHaveBeenCalled();
    });
  });
});
