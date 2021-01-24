import React from 'react';

jest.spyOn(window.localStorage.__proto__, 'setItem');
jest.spyOn(window.localStorage.__proto__, 'getItem');

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-redux-toastr', () => ({
  toastr: {
    error: jest.fn(),
  },
}));

jest.mock('react-beautiful-dnd', () => ({
  Draggable: function Draggable() {
    return <div>Test</div>;
  },
  DragDropContext: function DragDropContext() {
    return <div>Test</div>;
  },
  Droppable: function Droppable() {
    return <div>Test</div>;
  },
}));

jest.mock('react-router-dom', () => ({
  NavLink: function NavLink() {
    return <div>Test</div>;
  },
  Link: function Link() {
    return <div>Test</div>;
  },
  Redirect: function Redirect() {
    return <div>Test</div>;
  },
  useLocation: jest.fn(),
}));
