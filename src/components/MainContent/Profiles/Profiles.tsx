import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { StateType } from 'redux/store';

import style from 'components/MainContent/Profiles/Profiles.module.scss';

const Profiles: React.FC = () => {
  const userId = useSelector((state: StateType) => state.auth.userId);
  const admin = useSelector((state: StateType) => state.user.admin);
  const email = useSelector((state: StateType) => state.user.email);
  const id = useSelector((state: StateType) => state.user.id);
  const userName = useSelector((state: StateType) => state.user.userName);

  return userId ? (
    <div className={style.sidebarContainer}>
      <h1>Profiles page</h1>
      <div>
        <p>{admin}</p>
        <p>{email}</p>
        <p>{id}</p>
        <p>{userName}</p>
      </div>
    </div>
  ) : (
    <Navigate to='/signin' replace={true} />
  );
};

export default Profiles;
