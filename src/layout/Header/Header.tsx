import React from 'react';
import { NavLink } from 'react-router-dom';
import { isEmpty } from 'react-redux-firebase';
import { getAuth } from '../../store/Authorization/selectors';
import { logout } from '../../store/Authorization/actions';
import { useDispatch, useSelector } from 'react-redux';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="header">
      <div>
        <NavLink className="header__app-name" to="/">
          My trello
        </NavLink>
      </div>
      <div className="header__user-box">
        {isEmpty(auth) ? (
          <div>
            <NavLink className="header__login" to="/login">
              Login
            </NavLink>
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
