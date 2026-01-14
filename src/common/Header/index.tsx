import { memo, FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logoutAction } from '../../store/Authorization/actions';
import { ROUTES } from '../../routes/constants';
import { addTaskAction } from '../../store/Tasks/actions';
import { useAuth } from '../../hooks/useAuth';
import TaskModal from '../Modals/TaskModal';
import classes from './Header.module.scss';

const Header: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const onLogout = () => {
    dispatch(logoutAction.pending({}));
  };

  const addTaskToBase = (value: string, color: string, dateOfTheEnd: string) => {
    dispatch(addTaskAction.pending({ value, color, dateOfTheEnd }));
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={classes.header}>
      <div>
        {location.pathname !== ROUTES.MAIN && location.pathname !== ROUTES.LOGIN && (
          <NavLink className={classes.appName} to={ROUTES.MAIN}>
            Tasks
          </NavLink>
        )}

        {isAuthenticated && location.pathname === ROUTES.MAIN && (
          <Button variant="primary" className={classes.createBtn} onClick={openModal}>
            Create task
          </Button>
        )}
        {showModal && <TaskModal title="Create task" show onHide={closeModal} onConfirm={addTaskToBase} />}
        {isAuthenticated && location.pathname !== ROUTES.ANALYTICS && (
          <NavLink className={classes.appName} to={ROUTES.ANALYTICS} activeClassName={classes.analytics}>
            Analytics
          </NavLink>
        )}
      </div>
      <div className={classes.userBox}>
        {!isAuthenticated ? (
          <div>
            {!location.pathname.includes('login') && (
              <NavLink className={classes.login} to={ROUTES.LOGIN}>
                Login
              </NavLink>
            )}
          </div>
        ) : (
          <div className={classes.user}>
            Welcome, <span>{user?.displayName}</span>!
          </div>
        )}
        {isAuthenticated && (
          <div onClick={onLogout}>
            <NavLink className={classes.logout} to={ROUTES.LOGIN}>
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
