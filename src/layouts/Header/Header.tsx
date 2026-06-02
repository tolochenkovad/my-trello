import { memo } from 'react';
import { Flex } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth/store';
import { ROUTES } from '@/routes/constants';
import { useAuth } from '@/shared/hooks';
import { CreateTask } from '@/modules/Board/components';
import styles from './Header.module.scss';

const HeaderComponent = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const onLogout = useAuthStore((s) => s.actions.logout);

  return (
    <div className={styles.header}>
      <Flex gap={20} align="center">
        {location.pathname !== ROUTES.LOGIN && (
          <NavLink
            className={styles.page}
            to={ROUTES.MAIN}
            activeClassName={styles.activePage}
            isActive={() => location.pathname === ROUTES.MAIN}
          >
            Tasks
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            className={styles.page}
            to={ROUTES.ANALYTICS}
            activeClassName={styles.activePage}
            isActive={() => location.pathname === ROUTES.ANALYTICS}
          >
            Analytics
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            className={styles.page}
            to={ROUTES.TAGS}
            activeClassName={styles.activePage}
            isActive={() => location.pathname === ROUTES.TAGS}
          >
            Tags
          </NavLink>
        )}
      </Flex>
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
          <Flex gap={10} align="center">
            {location.pathname === ROUTES.MAIN && <CreateTask />}
            <div className={styles.user}>
              Welcome, <span>{user?.displayName}</span>!
            </div>
          </Flex>
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
