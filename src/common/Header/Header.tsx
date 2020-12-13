import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { isEmpty } from 'react-redux-firebase';
import { getAuth } from '../../store/Authorization/selectors';
import { logout } from '../../store/Authorization/actions';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../store/Tasks/actions';
import { Button } from 'react-bootstrap';
import TaskModal from '../Modals/TaskModal';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const onLogout = () => {
    dispatch(logout());
  };
  const location = useLocation();

  const addTaskToBase = (value) => {
    dispatch(addTask(value));
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="header">
      <div>
        <NavLink className="header__app-name" to="/">
          My trello
        </NavLink>
        {!isEmpty(auth) && (
          <Button variant="primary" className="header__create-btn" onClick={openModal}>
            Create task
          </Button>
        )}
        {showModal && <TaskModal title="Create task" show onHide={closeModal} onConfirm={addTaskToBase} />}
      </div>
      <div className="header__user-box">
        {isEmpty(auth) ? (
          <div>
            {!location.pathname.includes('login') && (
              <NavLink className="header__login" to="/login">
                Login
              </NavLink>
            )}
          </div>
        ) : (
          <div className="header__user">
            Welcome, <span>{auth.displayName}</span>!
          </div>
        )}
        {!isEmpty(auth) && (
          <div onClick={onLogout}>
            <NavLink className="header__logout" to="/login">
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Header);
