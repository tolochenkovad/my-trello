import React from 'react';
import { shallow } from 'enzyme';
import Task from './Task';

const props = {
  task: { id: '1', content: 'test', columnId: '1', date: 'date', dateOfTheEnd: 'dateOfTheEnd', color: '#000000' },
  index: 1,
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Task {...props} />);
});

describe('Task', () => {
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
