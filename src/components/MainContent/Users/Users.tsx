import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { StateType } from 'redux/store';

import style from 'components/MainContent/Users/Users.module.scss';

const Users: React.FC = () => {
  const userId = useSelector((state: StateType) => state.auth.userId);

  return userId ? (
    <div className={style.usersContainer}>
      <h1>Users page</h1>
    </div>
  ) : (
    <Navigate to='/signin' replace={true} />
  );
};

export default Users;
