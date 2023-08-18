import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { AppDispatch, StateType } from 'redux/store';

import style from 'components/MainContent/Dashboard/Dashboard.module.scss';
import { useEffect } from 'react';
import { getDashboardInfoTh } from 'redux/dashboard-reducer';
import { DashboardInfo } from './DashboardInfo/DashboardInfo';

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
        <DashboardInfo infoTitle={'Users'} infoData={usersCount} />
        <DashboardInfo infoTitle={'Profiles'} infoData={profilesCount} />
        <DashboardInfo infoTitle={'Users 18+'} infoData={adultProfilesCount} />
      </div>
    </div>
  ) : (
    <Navigate to='/signin' replace={true} />
  );
};
