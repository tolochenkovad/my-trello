import React, { FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { isEmpty } from 'react-redux-firebase';
import { getAuth } from '../../store/Authorization/selectors';
import { logout } from '../../store/Authorization/actions';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../store/Tasks/actions';
import { Button } from 'react-bootstrap';
import TaskModal from '../Modals/TaskModal/TaskModal';
import { ROUTES } from '../../routes/constants';

const Header: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const onLogout = () => {
    dispatch(logout());
  };
  const location = useLocation();

  const addTaskToBase = (value: string, color: string, dateOfTheEnd: string) => {
    dispatch(addTask(value, color, dateOfTheEnd));
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
        {location.pathname !== ROUTES.MAIN && location.pathname !== ROUTES.LOGIN && (
          <NavLink className="header__app-name" to={ROUTES.MAIN}>
            Tasks
          </NavLink>
        )}

        {!isEmpty(auth) && location.pathname === ROUTES.MAIN && (
          <Button variant="primary" className="header__create-btn" onClick={openModal}>
            Create task
          </Button>
        )}
        {showModal && <TaskModal title="Create task" show onHide={closeModal} onConfirm={addTaskToBase} />}
        {!isEmpty(auth) && location.pathname !== ROUTES.ANALYTICS && (
          <NavLink className="header__app-name" to={ROUTES.ANALYTICS} activeClassName="header__analytics">
            Analytics
          </NavLink>
        )}
      </div>
      <div className="header__user-box">
        {isEmpty(auth) ? (
          <div>
            {!location.pathname.includes('login') && (
              <NavLink className="header__login" to={ROUTES.LOGIN}>
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
            <NavLink className="header__logout" to={ROUTES.LOGIN}>
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Header);
