import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { StateType } from 'redux/store';

import style from 'components/MainContent/Profiles/Profiles.module.scss';

export const Profiles: React.FC = () => {
  const userId = useSelector((state: StateType) => state.auth.userId);
  const isAdmin = useSelector((state: StateType) => state.signedUser.isAdmin);
  const email = useSelector((state: StateType) => state.signedUser.email);
  const id = useSelector((state: StateType) => state.signedUser.id);
  const userName = useSelector((state: StateType) => state.signedUser.userName);

  return userId ? (
    <div className={style.profilesContainer}>
      <h1>Profiles page</h1>
      <p>isAdmin: {`${isAdmin}`}</p>
      <p>email: {email}</p>
      <p>id: {id}</p>
      <p>userName: {userName}</p>
    </div>
  ) : (
    <Navigate to='/signin' replace={true} />
  );
};
