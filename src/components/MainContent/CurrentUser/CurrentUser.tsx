import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import style from 'components/MainContent/CurrentUser/CurrentUser.module.scss';
import { CurrentUserCard } from 'components/MainContent/CurrentUser/CurrentUserCard/CurrentUserCard';
import { EditUserModal } from 'components/MainContent/CurrentUser/EditUserModal/EditUserModal';
import { DeleteUserModal } from 'components/MainContent/CurrentUser/DeleteUserModal/DeleteUserModal';
import { AppDispatch, StateType } from 'redux/store';
import { getCurrentUserById } from 'redux/current-user-reducer';

export const CurrentUser: React.FC = () => {
  const { state } = useLocation();
  const [editUserMode, setEditUserMode] = useState(false);
  const [deleteUserMode, setDeleteUserMode] = useState(false);
  const [isUserDeleted, setUserDeleted] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const loggedUserId = useSelector((state: StateType) => state.auth.userId);
  const userData = useSelector(
    (state: StateType) => state.currentUser.userData
  );

  useEffect(() => {
    dispatch(getCurrentUserById(state._id));
  }, []);

  if (!loggedUserId) {
    return <Navigate to='/signin' replace={true} />;
  }
  if (isUserDeleted) {
    return <Navigate to='/users' replace={true} />;
  }

  return (
    <div className={style.currentUserContainer}>
      {editUserMode && (
        <EditUserModal
          setEditUser={setEditUserMode}
          userName={userData?.userName}
          email={userData?.email}
          isAdmin={userData?.isAdmin}
          userId={state._id}
        />
      )}
      {deleteUserMode && (
        <DeleteUserModal
          setUserDeletedMode={setUserDeleted}
          setDeleteUserMode={setDeleteUserMode}
          userId={state._id}
        />
      )}
      <CurrentUserCard
        userName={userData?.userName}
        email={userData?.email}
        isAdmin={userData?.isAdmin}
        setEditUserMode={setEditUserMode}
        setDeleteUserMode={setDeleteUserMode}
      />
      <div className={style.profilesContainer}>
        <h1 className={style.title}>Profiles</h1>
      </div>
    </div>
  );
};
