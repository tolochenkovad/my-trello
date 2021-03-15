import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';
import { ROUTES } from '../../routes/constants';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<NotFound />);
});

describe('NotFound', () => {
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('children is exist', () => {
    it('container', () => {
      expect(wrapper.find('.notFound')).toHaveLength(1);
    });

    it('Droppable', () => {
      expect(wrapper.find('Link').props().to).toEqual(ROUTES.MAIN);
    });
  });
});