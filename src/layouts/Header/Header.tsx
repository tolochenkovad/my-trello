import { memo } from 'react';
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
      <div>
        {location.pathname !== ROUTES.MAIN && location.pathname !== ROUTES.LOGIN && (
          <NavLink className={styles.appName} to={ROUTES.MAIN}>
            Tasks
          </NavLink>
        )}

        {isAuthenticated && location.pathname === ROUTES.MAIN && <CreateTask className={styles.createBtn} />}
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
