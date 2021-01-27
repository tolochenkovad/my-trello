import React from 'react';
import { shallow } from 'enzyme';
import Analytics from './Analytics';
import { useSelector } from 'react-redux';

let wrapper;

const dataForChart = [
  ['Task', 'Quantity'],
  ['To do', 2],
  ['In progress', 1],
  ['Done', 0],
];

useSelector.mockImplementation(() => dataForChart);

beforeEach(() => {
  wrapper = shallow(<Analytics />);
});

describe('Analytics', () => {
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('children is exist', () => {
    it('Title', () => {
      expect(wrapper.find('h3')).toHaveLength(1);
    });

    it('Chart', () => {
      expect(wrapper.find('lazy').props().chartType).toEqual('PieChart');
    });
  });
});
