import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { AppDispatch, StateType } from 'redux/store';

import style from 'components/MainContent/Dashboard/Dashboard.module.scss';
import usersDashboardIcon from 'img/icons/usersDashboard.svg';
import profilesDashboardIcon from 'img/icons/profilesDashboard.svg';
import adultsDashboardIcon from 'img/icons/adultsDashboard.svg';
import { useEffect } from 'react';
import { getDashboardInfoTh } from 'redux/dashboard-reducer';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: StateType) => state.auth.userId);
  const usersCount = useSelector(
    (state: StateType) => state.dashboard.usersCount
  );
  const profilesCount = useSelector(
    (state: StateType) => state.dashboard.profilesCount
  );
  const adultProfilesCount = useSelector(
    (state: StateType) => state.dashboard.adultProfilesCount
  );

  useEffect(() => {
    dispatch(getDashboardInfoTh());
  }, []);

  return userId ? (
    <div className={style.dashboardContainer}>
      <h1 className={style.dashboardTitle}>Dashboard</h1>

      <div className={style.dashboardInfoContainer}>
        <div className={style.infoContainer}>
          <p className={style.infoTitle}>
            <img src={usersDashboardIcon} alt='' />
            <span>Users</span>
          </p>
          <p className={style.infoData}>{usersCount}</p>
        </div>

        <div className={style.infoContainer}>
          <p className={style.infoTitle}>
            <img src={profilesDashboardIcon} alt='' />
            <span>Profiles</span>
          </p>
          <p className={style.infoData}>{profilesCount}</p>
        </div>

        <div className={style.infoContainer}>
          <p className={style.infoTitle}>
            <img src={adultsDashboardIcon} alt='' />
            <span>Users 18+</span>
          </p>
          <p className={style.infoData}>{adultProfilesCount}</p>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/signin' replace={true} />
  );
};
