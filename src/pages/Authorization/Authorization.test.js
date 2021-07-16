import React from 'react';
import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';
import Authorization from './';
import { ROUTES } from '../../routes/constants';

const authData = {
  auth: {
    isLoaded: false,
    isEmpty: false,
    displayName: 'John Konnot',
    uid: 'udid123',
  },
};

useSelector.mockImplementation(() => authData);

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Authorization />);
});

describe('Authorization', () => {
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect to main if auth is exist', () => {
    expect(wrapper.find('Redirect').props().to).toEqual(ROUTES.MAIN);
  });
});
