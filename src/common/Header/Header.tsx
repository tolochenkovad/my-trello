import React, { FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { isEmpty } from 'react-redux-firebase';
import { getAuth } from '../../store/Authorization/selectors';
import { logoutAction } from '../../store/Authorization/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import TaskModal from '../Modals/TaskModal/TaskModal';
import { ROUTES } from '../../routes/constants';
import { addTaskAction } from '../../store/Tasks/actions';
const styles = require('./Header.module.scss');

const Header: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const onLogout = () => {
    dispatch(logoutAction.pending({}));
  };
  const location = useLocation();

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
    <div className={styles.header}>
      <div>
        {location.pathname !== ROUTES.MAIN && location.pathname !== ROUTES.LOGIN && (
          <NavLink className={styles.appName} to={ROUTES.MAIN}>
            Tasks
          </NavLink>
        )}

        {!isEmpty(auth) && location.pathname === ROUTES.MAIN && (
          <Button variant="primary" className={styles.createBtn} onClick={openModal}>
            Create task
          </Button>
        )}
        {showModal && <TaskModal title="Create task" show onHide={closeModal} onConfirm={addTaskToBase} />}
        {!isEmpty(auth) && location.pathname !== ROUTES.ANALYTICS && (
          <NavLink className={styles.appName} to={ROUTES.ANALYTICS} activeClassName={styles.analytics}>
            Analytics
          </NavLink>
        )}
      </div>
      <div className={styles.userBox}>
        {isEmpty(auth) ? (
          <div>
            {!location.pathname.includes('login') && (
              <NavLink className={styles.login} to={ROUTES.LOGIN}>
                Login
              </NavLink>
            )}
          </div>
        ) : (
          <div className={styles.user}>
            Welcome, <span>{auth.displayName}</span>!
          </div>
        )}
        {!isEmpty(auth) && (
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

export default React.memo(Header);
