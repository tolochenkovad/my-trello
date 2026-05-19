import { memo, FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { useTasksAsyncActions } from '@/store/Tasks/selectors';
import { useAuthStore } from '@/store/Auth/store';
import { ROUTES } from '@/routes/constants';
import { useAuth } from '@/hooks/useAuth';
import TaskModal from '../Modals/TaskModal';
import classes from './Header.module.scss';

const Header: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { addTask } = useTasksAsyncActions();

  const onLogout = useAuthStore((s) => s.actions.logout);

  const addTaskToBase = (value: string, dateOfTheEnd: string) => {
    addTask({ value, dateOfTheEnd });
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
          <Button type="primary" className={classes.createBtn} onClick={openModal}>
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
