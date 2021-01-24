import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import { ROUTES } from '../../routes/constants';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

let wrapper;

const DISPLAY_NAME = 'John Konnor';

const setup = (currentPathname, isMount, isNotAuth) => {
  const authParam = isNotAuth ? {} : { displayName: DISPLAY_NAME };
  useLocation.mockImplementation(() => ({ pathname: currentPathname }));
  useSelector.mockImplementation(() => authParam);
  if (isMount) {
    wrapper = mount(<Header />);
  } else {
    wrapper = shallow(<Header />);
  }
};

describe('Header', () => {
  it('should render', () => {
    setup(ROUTES.MAIN);
    expect(wrapper).toHaveLength(1);
  });

  it('should render correctly', () => {
    setup(ROUTES.MAIN);
    expect(wrapper).toMatchSnapshot();
  });

  describe('elements display correctly', () => {
    it('Tasks label should display if pathname is analysis', () => {
      setup(ROUTES.ANALYTICS);
      expect(wrapper.find('.header__app-name').children().text()).toEqual('Tasks');
    });

    it('Analysis label should display if pathname is /', () => {
      setup(ROUTES.MAIN);
      expect(wrapper.find('.header__app-name').children().text()).toEqual('Analytics');
    });

    it('Create task button should display if pathname is /', () => {
      setup(ROUTES.MAIN);
      expect(wrapper.find('.header__create-btn').children().text()).toEqual('Create task');
    });

    it('if user is authorized should display his name', () => {
      setup(ROUTES.MAIN);
      expect(wrapper.find('.header__user').text()).toContain(DISPLAY_NAME);
    });

    it('if user is authorized should display logout label', () => {
      setup(ROUTES.MAIN);
      expect(wrapper.find('.header__logout').children().text()).toEqual('Logout');
    });
  });

  describe('should works correctly', () => {
    it('should open TaskModal if user click on Create Task button', () => {
      setup(ROUTES.MAIN, true);
      expect(wrapper.find('TaskModal')).toHaveLength(0);
      wrapper.find('.header__create-btn').at(0).simulate('click');
      expect(wrapper.find('TaskModal')).toHaveLength(1);
    });
  });
});
