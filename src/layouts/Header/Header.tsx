import { memo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { useTasksAsyncActions } from '@/entities/tasks/store/selectors';
import { useAuthStore } from '@/entities/auth/store';
import { ROUTES } from '@/routes/constants';
import { useAuth } from '@/shared/hooks/useAuth';
import { AddTaskModal } from '@/modules/Board/components';
import styles from './Header.module.scss';

const HeaderComponent = () => {
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
    <div className={styles.header}>
      <div>
        {location.pathname !== ROUTES.MAIN && location.pathname !== ROUTES.LOGIN && (
          <NavLink className={styles.appName} to={ROUTES.MAIN}>
            Tasks
          </NavLink>
        )}

        {isAuthenticated && location.pathname === ROUTES.MAIN && (
          <Button type="primary" className={styles.createBtn} onClick={openModal}>
            Create task
          </Button>
        )}
        {showModal && <AddTaskModal title="Create task" show onHide={closeModal} onConfirm={addTaskToBase} />}
        {isAuthenticated && location.pathname !== ROUTES.ANALYTICS && (
          <NavLink className={styles.appName} to={ROUTES.ANALYTICS} activeClassName={styles.analytics}>
            Analytics
          </NavLink>
        )}
      </div>
      <div className={styles.userBox}>
        {!isAuthenticated ? (
          <div>
            {!location.pathname.includes('login') && (
              <NavLink className={styles.login} to={ROUTES.LOGIN}>
                Login
              </NavLink>
            )}
          </div>
        ) : (
          <div className={styles.user}>
            Welcome, <span>{user?.displayName}</span>!
          </div>
        )}
        {isAuthenticated && (
          <div onClick={onLogout}>
            <NavLink className={styles.logout} to={ROUTES.LOGIN}>
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export const Header = memo(HeaderComponent);
