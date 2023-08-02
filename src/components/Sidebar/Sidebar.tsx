import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from 'redux/store';

import { signOutUserTh } from 'redux/auth-reducer';
import style from 'components/Sidebar/Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import avatar from 'img/assets/avatarProfileUser.png';
import { ReactComponent as Profiles } from 'img/icons/profiles.svg';
import { ReactComponent as Users } from 'img/icons/users.svg';
import { ReactComponent as Dashboard } from 'img/icons/dashboard.svg';

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAdmin = useSelector((state: StateType) => state.signedUser.isAdmin);

  return (
    <div className={style.sidebarContainer}>
      <div className={style.sidebarContent}>
        <img src={avatar} alt='' className={style.userImage} />
        <p className={style.userRole}>{isAdmin ? 'Admin' : ' Simple User'}</p>
        <NavLink
          to='/profiles'
          className={({ isActive }) =>
            isActive ? style.activeNavLink : style.navLink
          }
        >
          <Profiles
            fill='#F0ECE6'
            width={'29px'}
            height={'29px'}
            className={style.icon}
          />
          Profiles
        </NavLink>

        {isAdmin && (
          <>
            <NavLink
              to='/users'
              className={({ isActive }) =>
                isActive ? style.activeNavLink : style.navLink
              }
            >
              <Users
                fill='#F0ECE6'
                width={'34px'}
                height={'34px'}
                className={style.icon}
              />
              Users
            </NavLink>
            <NavLink
              to='/dashboard'
              className={({ isActive }) =>
                isActive ? style.activeNavLink : style.navLink
              }
            >
              <Dashboard
                fill='#F0ECE6'
                width={'29px'}
                height={'29px'}
                className={style.icon}
              />
              Dashboard
            </NavLink>
          </>
        )}
      </div>
      <button
        className={style.logOutButton}
        onClick={() => dispatch(signOutUserTh())}
      >
        Log out
      </button>
    </div>
  );
};
