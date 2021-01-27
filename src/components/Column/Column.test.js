import React from 'react';
import { shallow } from 'enzyme';
import Column from './Column';

const props = {
  column: { id: '1', title: 'title', taskIds: ['a1', 'a2'] },
  tasks: [{ id: '1', content: 'test', columnId: '1', date: 'date', dateOfTheEnd: 'dateOfTheEnd', color: '#000000' }],
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Column {...props} />);
});

describe('Column', () => {
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('children is exist', () => {
    it('Column title', () => {
      expect(wrapper.find('.column__title')).toHaveLength(1);
    });

    it('Droppable', () => {
      expect(wrapper.find('Droppable')).toHaveLength(1);
    });
  });
});
