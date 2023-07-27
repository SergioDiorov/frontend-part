import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { StateType } from 'redux/store';

import style from 'components/MainContent/Dashboard/Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const userId = useSelector((state: StateType) => state.auth.userId);

  return userId ? (
    <div className={style.sidebarContainer}>
      <h1>Dashboard page</h1>
    </div>
  ) : (
    <Navigate to='/signin' replace={true} />
  );
};

export default Dashboard;
